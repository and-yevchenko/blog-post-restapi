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
                    <ul className='post-comments-list'>
                        <li className='post-comments-item'>
                            <div>
                                <img src="/" alt="user" className='user-photo'/>
                                <span className='user-nickname'>and.yevchenko</span>
                            </div>
                            <p>Lorem ipsum dolor sit amet.</p>
                            {/* <span>Reply</span>  TODO*/}
                        </li>
                    </ul>
                    <form action="" className='add-comment'>
                        <input type="text" name="" id="" placeholder='Write a comment'/>
                        <button type='submit'>Comment</button>
                    </form>
                </div>
            </div>

        </div>
    )
}
