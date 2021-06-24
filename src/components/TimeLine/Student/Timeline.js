import { Alert } from "reactstrap";
import React, { Component } from "react";

import TimelineItem from "./TimelineItem";

const Timeline = (props) => {
  const timelineData = [
    {
      text: "Started working on the app-ideas repository",
      date: "Class Id : xxxxxxxx",
      category: {
        tag: "Maths",
        color: "#0069d9",
      },
      link: {
        url: "",
        text: "Check it out on GitHub",
      },
    },
    {
      text: "Started the Weekly Coding Challenge program",
      date: "Class Id : xxxxxxxx",
      category: {
        tag: "blog",
        color: "#0069d9",
      },
      link: {
        url: "",
        text: "Check it out here",
      },
    },
    {
      text: "Got 1.000 followers on Twitter",
      date: "Class Id : xxxxxxxx",
      category: {
        tag: "twitter",
        color: "#0069d9",
      },
      link: {
        url: "",
        text: "See profile",
      },
    },
    {
      text: "I published my first article in the FreeCodeCamp Medium Publication",
      date: "Class Id : xxxxxxxx",
      category: {
        tag: "Physics",
        color: "#0069d9",
      },
      link: {
        url: "",
        text: "Check it out here",
      },
    },
    {
      text: "Over 12.000 views in a single day on my Medium posts",
      date: "Class Id : xxxxxxxx",
      category: {
        tag: "Physics",
        color: "#0069d9",
      },
      link: {
        url: "",
        text: "See profile",
      },
    },
    {
      text: "Over 12.000 views in a single day on my Medium posts",
      date: "Class Id : xxxxxxxx",
      category: {
        tag: "Physics",
        color: "#0069d9",
      },
      link: {
        url: "",
        text: "See profile",
      },
    },
    {
      text: "Over 12.000 views in a single day on my Medium posts",
      date: "Class Id : xxxxxxxx",
      category: {
        tag: "Physics",
        color: "#0069d9",
      },
      link: {
        url: "",
        text: "See profile",
      },
    },
    {
      text: "Over 12.000 views in a single day on my Medium posts",
      date: "Class Id : xxxxxxxx",
      category: {
        tag: "Physics",
        color: "#0069d9",
      },
      link: {
        url: "",
        text: "See profile",
      },
    },
  ];
  return props.students.length > 0 ? (
    <div className="timeline-container">
      {props.students.map((data, idx) => (
        <TimelineItem data={data} key={idx} />
      ))}
    </div>
  ) : (
    <Alert color="info">
      <span className="alert-icon">
        <i class="fas fa-info-circle" style={{ color: "#004085" }}></i>
      </span>
      <span className="alert-text" style={{ color: "#004085" }}>
        <strong>{props.name}</strong> is not enrolled in any class.
      </span>
    </Alert>
  );
};
export default Timeline;
