import './Post.css';

export const Post = () => {

    return (
        <div className='post'>

            <div className='post-head'>
                <div className='user'>
                    <img src="/" alt="user" className='user-photo'/>
                    <span className='user-nickname'>and.yevchenko</span>
                </div>
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
                <div>
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
                            <span>Reply</span>
                        </li>
                    </ul>
                    <form action="">
                        <input type="text" name="" id="" placeholder='Write a comment'/>
                        <button type='submit'>Comment</button>
                    </form>
                </div>
            </div>
            
        </div>
    )
}
