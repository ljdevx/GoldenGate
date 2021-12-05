import React from "react";
import { Link } from "react-router-dom";
import eth from "../../../assets/media/avatar/eth.png";
import avatar3 from "../../../assets/media/avatar/3.png";
import { ReactComponent as LocationMarker } from "../../../assets/media/heroicons/solid/location-marker.svg";

const Friend = (props) => {
  
  return (
    <li className={"contacts-item " + (props.active ? "active" : "")} onClick={() => {console.log(props)}}>
      <Link to="#" className="contacts-link" target>
        <div className="avatar">
          <img src={eth} alt=""></img>
        </div>
        <div className="contacts-content">
          <div className="contacts-info">
            <h6 className="chat-name text-truncate">{props.name}</h6>
          </div>
          <div className="contacts-texts">
            <LocationMarker className="hw-16 text-muted mr-1" />
            <p className="text-muted mb-0">{props.location}</p>
          </div>
        </div>
      </Link>
    </li>
  );
};
export default Friend;
