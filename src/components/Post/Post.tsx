import { AddComment } from '../AddComment/AddComment';
import { CommentsList } from '../CommentsList/CommentsList';
import { MoreOptions } from '../MoreOptions/MoreOptions';
import { PostPanel } from '../PostPanel/PostPanel';
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
                <div className='post-text'></div>
                <div className='post-img'></div>
            </div>

            <div className='post-foot'>
                <PostPanel />
                <div>
                    <CommentsList />
                    <AddComment />
                </div>
            </div>

        </div>
    )
}
