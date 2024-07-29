import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import './styles/HomepageHeader.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

export default function HomepageHeader({ month, year, id, users, groups }) {
    const [showDropDown, setShowDropDown] = useState(false);
    const [isUserGotten, setIsUserGotten] = useState(false);
    const [triedFetch, setTriedFetch] = useState(false);
    const [foundUser, setFoundUser] = useState({});
    const [membersCount, setMembersCount] = useState("");
    const [projectName, setProjectName] = useState("");


    useEffect(() => {
        const monthObj = {
            "January": 1,
            "May": 2,
            "September": 3,
        }
        const getUser = users.find((user) => user.id === id);
        if (getUser) {
            if (!getUser.group) {
                setMembersCount("");
                setProjectName("");
                setIsUserGotten(true);
                setTriedFetch(true);
                setFoundUser(getUser);
            } else {
                const groupId = parseInt(getUser.group);
                const members = groups[year][monthObj[month] - 1][month][groupId - 1][`group${groupId}`]["length"];
                const project_name = (groups[year][monthObj[month] - 1][month][groupId - 1][`group${groupId}`]["Project Name"]);
                setMembersCount(members);
                setProjectName(project_name)
                setIsUserGotten(true);
                setTriedFetch(true);
                setFoundUser(getUser);
            }
        } else {
            setIsUserGotten(false);
            setTriedFetch(true);
            setFoundUser({});
        }
    }, [users, id, groups, month, year])

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
                        <FontAwesomeIcon icon={faHouse} className="fa-icon-home" />
                        <h1>Home</h1>
                    </div>
                    <div className="dropdown">
                        <div className="select" onClick={handleShowDropDown}>
                            <span type="button" className="selected">...</span>
                            <div className={`caret ${showDropDown ? 'caret-rotate' : null}`}></div>
                        </div>
                        {showDropDown ? (
                            <ul className="menu">
                                <li className="activated"><Link to={`/discussions/${id}/${year}/${month}/${foundUser.group}/${membersCount}/${projectName}`}>Discussions</Link></li>
                                <li><Link to={`/filesharing/${id}/${year}/${month}/${foundUser.group}/${membersCount}/${projectName}`}>File Sharing</Link></li>
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
    )
}
