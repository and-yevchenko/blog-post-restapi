import { AddComment } from '../AddComment/AddComment';
import { CommentsList } from '../CommentsList/CommentsList';
import { MoreOptions } from '../MoreOptions/MoreOptions';
import { PostPanel } from '../PostPanel/PostPanel';
import { PostText } from '../PostText/PostText';
import { User } from '../User/User';
import './Post.css';

export const Post = () => {
//TODO
    return (
        <div className='post'>
            <div className='post-head'>
                <User />
                <MoreOptions />
            </div>
            <div className='post-main'>
                <PostText />
                <img className='post-img' src="/witcher.jpg" alt="witcher" width="100%"/>
            </div>
            <div className='post-foot'>
                <PostPanel />
                <CommentsList />
                <AddComment />
            </div>
        </div>
    )
}
