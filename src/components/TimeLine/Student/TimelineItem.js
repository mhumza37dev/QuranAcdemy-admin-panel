import React, { Component } from "react";

const TimelineItem = ({ data }) => {
  return (
    <div className="timeline-item">
      <div className="timeline-item-content">
        <span className="tag" style={{ background: "#5e72e4" }}>
          {data.course + "(" + data.time_slot + ")"}
        </span>
        {/* <time>{"Slot :" + }</time> */}
        <p>{data.text}</p>
        {data.subscription_type && (
          <a
            href=""
            rel="noopener noreferrer"
            style={{ textAlign: "left !important" }}
          >
            {data.subscription_type}
          </a>
        )}
        <span className="circle" />
      </div>
    </div>
  );
};

export default TimelineItem;
