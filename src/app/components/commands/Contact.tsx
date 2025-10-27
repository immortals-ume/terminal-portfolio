import React from "react";
import { personalInfo } from "../../../data/portfolio";
import ClickableLink from "../ui/ClickableLink";

export default function Contact() {
  return (
    <div className="space-y-1">
      <div>Professional Contact Information:</div>
      <div>- Name: {personalInfo.name}</div>
      <div>- Email: <ClickableLink url={`mailto:${personalInfo.email}`} text={personalInfo.email} /></div>
      <div>- Phone: {personalInfo.phone}</div>
      <div>- Location: {personalInfo.location}</div>
      <div>- Portfolio: <ClickableLink url={personalInfo.website} /></div>
      <div>- GitHub: <ClickableLink url={`https://github.com/${personalInfo.github}`} /></div>
      <div>- LinkedIn: <ClickableLink url={`https://linkedin.com/in/${personalInfo.linkedin}`} /></div>
      <div>- LeetCode: <ClickableLink url={`https://leetcode.com/u/${personalInfo.leetcode}/`} /></div>
      <br />
      <div>Hint: Use `contact` to view again, or `help` for more commands.</div>
    </div>
  );
}
