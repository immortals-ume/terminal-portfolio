import React from "react";
import { personalInfo } from "../../../data/portfolio";
import ClickableLink from "../ui/ClickableLink";
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        Professional Contact Information:
      </div>
      {personalInfo?.name && (
        <div className={styles.contactItem}>- Name: {personalInfo.name}</div>
      )}
      {personalInfo?.email && (
        <div className={styles.contactItem}>- Email: <ClickableLink url={`mailto:${personalInfo.email}`} text={personalInfo.email} /></div>
      )}
      {personalInfo?.phone && (
        <div className={styles.contactItem}>- Phone: {personalInfo.phone}</div>
      )}
      {personalInfo?.location && (
        <div className={styles.contactItem}>- Location: {personalInfo.location}</div>
      )}
      {personalInfo?.website && (
        <div className={styles.contactItem}>- Portfolio: <ClickableLink url={personalInfo.website} /></div>
      )}
      {personalInfo?.github && (
        <div className={styles.contactItem}>- GitHub: <ClickableLink url={`https://github.com/${personalInfo.github}`} /></div>
      )}
      {personalInfo?.linkedin && (
        <div className={styles.contactItem}>- LinkedIn: <ClickableLink url={`https://linkedin.com/in/${personalInfo.linkedin}`} /></div>
      )}
      {personalInfo?.leetcode && (
        <div className={styles.contactItem}>- LeetCode: <ClickableLink url={`https://leetcode.com/u/${personalInfo.leetcode}/`} /></div>
      )}
      <br />
      <div className={styles.hint}>
        Hint: Use `contact` to view again, or `help` for more commands.
      </div>
    </div>
  );
}
