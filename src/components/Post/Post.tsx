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
}

export const Post: React.FC<PostProps> = ({ post }) => {
    return (
        <div className="post">
            <div className="post-head">
                <User />
                <MoreOptions />
            </div>
            <div className="post-main">
                {post.text && <PostText text={post.text} maxLength={200} />}
                {post.image && <img className="post-img" src={post.image}alt="post" width="100%"/>}
            </div>
            <div className="post-foot">
                <PostPanel />
                <CommentsList />
                <AddComment />
            </div>
        </div>
    );
};
