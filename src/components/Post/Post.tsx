import { User } from '../User/User';
import './Post.css';

export const Post = () => {


    //TODO
    return (
        <div className='post'>

            <div className='post-head'>
                <User />
                <div className='more-options'>
                    <span>Edit</span>
                    <span>Delete</span>
                </div>
            </div>

            <div className='post-main'>
                <div className='post-text'></div>
                <div className='post-img'></div>
            </div>

            <div className='post-foot'>
                <div className='post-foot-panelle'> {/*TODO*/}
                    <div>
                        <button type='button'>Like</button>
                        <button type='button'>Comment</button>
                    </div>
                    <div className='post-likes'>10 likes</div>
                </div>
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
