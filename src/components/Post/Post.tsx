import { useRef } from 'react';
import { IPost } from '../../data/_type';
import { AddComment } from '../AddComment/AddComment';
import { CommentsList } from '../CommentsList/CommentsList';
import { MoreOptions } from '../MoreOptions/MoreOptions';
import { PostPanel } from '../PostPanel/PostPanel';
import { PostText } from '../PostText/PostText';
import { User } from '../User/User';
import './Post.css';

interface PostProps {
    post: IPost;
    setOpenEditPost: (value: boolean) => void;
    setDataEditPost: (value: IPost | null) => void;
}

export const Post: React.FC<PostProps> = ({ post, setOpenEditPost, setDataEditPost }) => {

    const refForm = useRef<HTMLFormElement>(null);

    return (
        <div className="post">
            <div className="post-head">
                <User />
                <MoreOptions 
                    post={post} 
                    setOpenEditPost={setOpenEditPost} 
                    setDataEditPost={setDataEditPost}
                />
            </div>
            <div className="post-main">
                {post.text && <PostText text={post.text} maxLength={200} />}
                {post.image && <img className="post-img" src={post.image}alt="post" width="100%"/>}
            </div>
            <div className="post-foot">
                <PostPanel post={post} focusElement={refForm}/>
                {post.comments && <CommentsList {...(post.comments && { comments: post.comments })}/>}
                <AddComment post={post} ref={refForm}/>
            </div>
        </div>
    );
};
