import './directory-item.styles.scss'
import { Link } from 'react-router-dom';
import Button from '../button/button.component';
import { } from 'react-router-dom'
const DirectoryItem = ({ imageUrl, title }) => {
    return (

        <div className='directory-item-container'>
            <div className='background-image' style={{ backgroundImage: `url(${imageUrl})` }} />
            <div className='body'>
                <h2>{title}</h2>
                <br />
                <Link to={`/shop/${title}`}><Button buttonType='inverted'>Shop Now</Button></Link>
            </div>
        </div>

    )

}
export default DirectoryItem;