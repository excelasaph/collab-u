import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import './styles/GeneralHomeHeader.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';

export default function GeneralHomeHeader({ month, year, id, title, users, members, project_name }) {
    const [showDropDown, setShowDropDown] = useState(false);
    const [isUserGotten, setIsUserGotten] = useState(false);
    const [triedFetch, setTriedFetch] = useState(false);
    const [foundUser, setFoundUser] = useState({});

    useEffect(() => {
        const getUser = users.find((user) => user.id === id);
        if (getUser) {
            setIsUserGotten(true);
            setTriedFetch(true);
            setFoundUser(getUser);
        } else {
            setIsUserGotten(false);
            setTriedFetch(true);
            setFoundUser({});
        }
    }, [users, id])

    const handleShowDropDown = () => {
        if (showDropDown) {
            setShowDropDown(false);
        } else {
            setShowDropDown(true);
        }
    }

    return (

        <div className="homepageheader-container">
            {triedFetch ? isUserGotten ? (
                <div className="home-items-fixed">
                    <div className="home-logo-fixed">
                        {title === "Discussions" ? <FontAwesomeIcon icon={faMessage} className="fa-icon-home" /> : <FontAwesomeIcon icon={faFolderOpen} className="fa-icon-home"/>}
                        
                        <h1>{title}</h1>
                    </div>
                    <div className="dropdown">
                        <div className="select" onClick={handleShowDropDown}>
                            <span type="button" className="selected">...</span>
                            <div className={`caret ${showDropDown ? 'caret-rotate' : null}`}></div>
                        </div>
                        {showDropDown ? (
                            <ul className="menu">
                                <li className="activated"><Link to={`/discussions/${id}/${year}/${month}/${foundUser.group}/${members}/${project_name}`}>Discussions</Link></li>
                                <li><Link to={`/filesharing/${id}/${year}/${month}/${foundUser.group}/${members}/${project_name}`}>File Sharing</Link></li>
                                <li><Link to={`/home/${id}/${year}/${month}`}>Home</Link></li>
                            </ul>
                        ) : null}
                    </div>
                </div>
            ) : (
                <div>
                    user not found ...
                </div>
            ) : (
                <div>
                    Fetching data ...
                </div>
            )}
        </div>

        // <div className="homepageheader-container">
        //     {triedFetch ? isUserGotten ? (
        //         <div>
        //             <div>
        //                 home and logo
        //             </div>
        //             <div>
        //                 <button
        //                     type="button"
        //                     onClick={handleShowDropDown}
        //                 >
        //                     ...
        //                 </button>
        //             </div>
        //             {showDropDown ? (
        //                 <div>
        //                     <ul>
        //                         <li><Link to={`/discussions/${id}/${year}/${month}/${foundUser.group}/${members}/${project_name}`}>discussions</Link></li>
        //                         <li><Link to={`/filesharing/${id}/${year}/${month}/${foundUser.group}/${members}/${project_name}`}>filesharing</Link></li>
        //                         <li><Link to={`/home/${id}/${year}/${month}`}>Homepage</Link></li>
        //                     </ul>
        //                 </div>
        //             ) : null}
        //         </div>
        //     ) : (
        //         <div>
        //             user not found ...
        //         </div>
        //     ) : (
        //         <div>
        //             Fetching data ...
        //         </div>
        //     )}
        // </div>
    )
}
