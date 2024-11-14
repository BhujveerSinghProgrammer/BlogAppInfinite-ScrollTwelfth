import React, { useState, useEffect } from 'react';
import { loadAllPostsByPageNumberandPageSize } from '../services/post-service';
import { Row, Col, Container } from 'reactstrap';
import Posts from './Posts';
import { toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';

function NewFeed() {
  const [postContent, setPostContent] = useState({
    Contents: [],
    LastPage: 0,
    PageNumber: 1,  // Start at page 1 (1-based)
    PageSize: 10,   // Default page size
    TotalElements: 0,
    TotalPages: 0
  });

  const [currentPage, setCurrentPage] = useState(1);

  // Fetch paged posts when the page is first loaded
  useEffect(() => {
    changePage(currentPage);
  }, [currentPage]); // Only runs on currentPage change

  // Handle page change
  const changePage = (pageNumber) => {
    if (pageNumber > postContent.PageNumber && postContent.LastPage) {
      return;
    }

    if (pageNumber < postContent.PageNumber && postContent.PageNumber === 0) {
      return;
    }

    loadAllPostsByPageNumberandPageSize(pageNumber, postContent.PageSize)
      .then((data) => {
        setPostContent({
          Contents: [...postContent.Contents, ...data.Contents],
          LastPage: data.LastPage,
          PageNumber: data.PageNumber,
          PageSize: data.PageSize,
          TotalElements: data.TotalElements,
          TotalPages: data.TotalPages
        });

        console.log('Page Number:', pageNumber);
        console.log(data);

        // Optionally, reset scroll position
        // window.scroll(0, 0);
      })
      .catch((error) => {
        toast.error('Error in Loading Posts Pagewise');
      });
  };

  const changePageInfinite = () => {
    console.log('Page changed');
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container-fluid">
      <Row>
        <Col md={{ size: 10, offset: 1 }}>
          <h3>Blogs Count ({postContent?.TotalElements})</h3>

          <InfiniteScroll
            dataLength={postContent?.Contents.length}
            next={changePageInfinite}
            hasMore={true}
            loader={<h4>Loading...</h4>}
             endMessage={
                <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
                 </p>
                  }

          >
            {postContent?.Contents?.map((post) => (
              <Posts post={post} key={post.Id} />
            ))}
          </InfiniteScroll>
        </Col>
      </Row>
    </div>
  );
}

export default NewFeed;
