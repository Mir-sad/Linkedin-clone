import styled from "styled-components";
import React, { useEffect, useState } from 'react'
import PostModal from "./PostModal";

import {connect} from "react-redux";
import { getArticlesAPI } from "../actions";
import ReactPlayer from "react-player";

const Main = (props) => {
    const [showModal, setShowModal] = useState("close");

    useEffect(() => {
        props.getArticles();
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        if(e.target !== e.currentTarget) {
            return;
        }
        switch(showModal) {
            case "open":
                setShowModal("close");
                break;
            case "close":
                setShowModal("open");
                break;
            default:
                setShowModal("close");
                break; 
        }
    };
    return (
        <>
        {
            props.articles.length === 0 ? (
            <p>There are no articles</p>
            ):(
        <Container>
            <ShareBox>
            <div>
                { props.user && props.user.photoURL ? (
                <img src={props.user.photoURL} />
                ) : (
             <img src="/images/user.svg" />
                )}
            <button onClick={handleClick}
            disabled={props.loading ? true : false}>Start a post</button>
            </div>
            <div>
                <button>
                    <img src="/images/photo-icon.png" />
                    <span>Photo</span>
                </button>
                <button>
                    <img src="/images/video-icon.png" />
                    <span>Video</span>
                </button>
                <button>
                    <img src="/images/event-icon.png" />
                    <span>Event</span>
                </button>
                <button>
                    <img src="/images/article-icon.png" />
                    <span>Article</span>
                </button>
            </div>
            </ShareBox>
            <Content>
                {
                    props.loading && <img src='/images/spin-loader.svg'/>
                }
                {props.articles.length > 0 &&
                props.articles.map((article, key) => (
                <Article key={key}>
                    <SharedActor>
                        <a>
                            <img src={article.actor.image} />
                            <div>
                                <span>{article.actor.title}</span>
                                <span>{article.actor.description}</span>
                                <span>{article.actor.date.toDate().toLocaleDateString()}</span>
                            </div>
                        </a>
                        <button>
                            <img src="/images/ellipsis.png" />
                        </button>
                    </SharedActor>
                    <Description>{article.description}</Description>
                    <SharedImg>
                        <a>
                        {!article.sharedImg && article.video ? (
                                 <ReactPlayer width={"100%"} url={article.video} />
                            
                                ) : (
                                    article.sharedImg && <img src={article.sharedImg} />
                            )}
                        </a>
                    </SharedImg>
                    <SocialCounts>
                        <li>
                            <button>
                                <img src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb" />
                                <img src="data:image/jpeg;base64,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" />
                                <span>75</span>
                            </button>
                        </li>
                        <li>
                            <a>
                                {article.comments}
                            </a>
                        </li>
                    </SocialCounts>
                    <SocialActions>
                    <button>
                        <img src="/images/like-icon.png" />
                        <span>Like</span>
                    </button>
                    <button>
                        <img src="/images/comment-icon.png" />
                        <span>comment</span>
                    </button>
                    <button>
                        <img src="/images/share-icon.png" />
                        <span>Share</span>
                    </button>
                    <button>
                        <img src="/images/send-icon.png" />
                        <span>Send</span>
                    </button>
                    </SocialActions>
                </Article>
                ))}
            </Content>
            <PostModal showModal={showModal} handleClick={handleClick} />

        </Container>
            )}
        </>
    )
}



const Container = styled.div`
grid-area: main;
`;

const CommonCard = styled.div`
   text-align: center;
   overflow: hidden;
   margin-bottom: 8px;
   background-color: #fff;
   border-radius: 5px;
   position: relative;
   border: none;
   box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
   div {
       button {
           outline: none;
           color: rgba(0, 0, 0, 0.6);
           font-size: 14px;
           min-height: 48px;
           background: transparent;
           border: none;
           display: flex;
           align-items: center;
           font-weight: 600;

       }
       &:first-child{
           display: flex;
           align-items: center;
           padding: 8px 16px 0px 16px;

           img {
               width: 48px;
               border-radius: 50%;
               margin-right: 8px;

           }
           button {
               margin: 4px 0;
               flex-grow: 1;
               border-radius: 35px;
               padding-left: 16px;
               border: 1px solid rgba(0, 0, 0, 0.15);
               background-color: white;
               text-align: left;
           }

       }
       &:nth-child(2) {
           display: flex;
           flex-wrap: wrap;
           justify-content: space-around;
           padding-bottom: 4px;
           button{
           img {
               width:35px;
               margin: 0 4px 0 -2px;
           }
           span {
               color: #70b5f9;
           }
        }
       }
   }
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
 
`;

const SharedActor = styled.div`
   padding-right: 40px;
   flex-wrap: nowrap;
   position: 12px 16px 0;
   margin-bottom: 8px;
   align-items: center;
   display: flex;
    a {
        margin-right: 12px;
        flex-grow: 1;
        overflow: hidden;
        display: flex;
        text-decoration: none;

        img {
            width: 48px;
            height: 48px;
        }
        & > div {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            flex-basis: 0;
            margin-left: 8px;
            overflow: hidden;
            span {
                text-align: left;
                &:first-child {
                    font-size: 14px;
                    font-weight: 700;
                    color: rgba(0, 0, 0, 1);
                }

                &:nth-child(n + 1) {
                    font-size: 12px;
                    color: rgba(0, 0, 0, 0.6);
                }
            }
        }
    }
    button {
        position: absolute;
        right: 12px;
        top: 0;
        background: transparent;
        border: none;
        outline: none;
        img{
            width: 40px;
        }
    }

`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;

const SharedImg = styled.div`
   margin-top: 8px;
   width: 100%;
   display: block;
   position: relative;
   background-color: #f9fafb;

   img {
       object-fit: contain;
       width: 100%;
       height: 100%;

   }
`;

const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li {
      margin-right: 5px;
      font-size: 12px;
      button {
          display: flex;
          border: none;
          background-color: white;
          img {
              width: 17px;
          }
      }
  }
  `;

const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
   button {
       display: inline-flex;
       align-items: center;
       padding: 8px;
       color: #0a66c2;
       border: none;
       background-color: none;
      @media(min-width: 768px){
          span {
              margin-left: 8px;
          }
      }
      img {
          width: 15px;
          background: transparent;
      }
  }
`;

const Content = styled.div`
text-align: center;
& > img {
    width: 30px;
}
`;
const mapStateToProps = (state) => {
    return {
        loading: state.articleState.loading,
        user: state.userState.user,
        articles: state.articleState.articles,
    };
};
    const mapDispatchToProps = (dispatch) => ({
        getArticles: () => dispatch(getArticlesAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);