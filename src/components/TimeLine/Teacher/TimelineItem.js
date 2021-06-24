import React, { Component } from "react";
const TimelineItem = ({ data }) => {
  return (
    <div className="timeline-item">
      <div className="timeline-item-content">
        <span className="tag" style={{ background: "blue" }}>
          {data.course.Title + " (" + data.days + ")"}
        </span>
        <time className="text-muted">{data.id}</time>
        <p>{("Time Slot : ", data.time_slot)}</p>
        {
          <a href={data.classroom_url} rel="noopener noreferrer">
            {data.classroom_url}
          </a>
        }
        <span className="circle" />
      </div>
    </div>
  );
};

export default TimelineItem;
