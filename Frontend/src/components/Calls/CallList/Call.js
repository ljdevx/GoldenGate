import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as CallsSvg } from "../../../assets/media/icons/calls.svg";
import { CallFilterOptions, ProfileType } from "../../../Config/Config";

const Call = (props) => {
  let profile = "";
  switch (props.profileType) {
    case ProfileType.Image:
      profile = (
        <div className="avatar">
          <img src={props.profile} alt=""></img>
        </div>
      );
      break;
    case ProfileType.Svg:
      profile = (
        <div className="avatar bg-success text-light">
          <span>{props.profile}</span>
        </div>
      );
      break;
    case ProfileType.Text:
      profile = (
        <div className="avatar bg-info text-light">
          <span>EW</span>
        </div>
      );
      break;
    default:
      break;
  }

  return (
    <li className={"contacts-item " + (props.active ? "active" : "")}>
      <Link to="#" className="media-link"></Link>
      <div className="contacts-link">
        <div className="avatar">{profile}</div>
        <div className="contacts-content">
          <div className="contacts-info">
            <h6 className="chat-name text-truncate">{props.name}</h6>
          </div>
          <div className="contacts-texts">
            {props.CallTypeIcon}
            <p
              className={
                (props.filter === CallFilterOptions.Missedcalls
                  ? "text-danger"
                  : "text-muted") + " mb-0"
              }
            >
              {props.time}
            </p>
          </div>
        </div>
        <div className="contacts-action">
          <button
            className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted"
            type="button"
          >
            <CallsSvg className="hw-20" />
          </button>
        </div>
      </div>
    </li>
  );
};
export default Call;
