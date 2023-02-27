import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import "dayjs/locale/it";
import {
  collection,
  getDocs,
  deleteDoc,
  query,
  where,
  getDoc,
  onSnapshot,
  addDoc,
  doc,
  ref,
  set,
  setDoc,
  updateDoc,
  increment
} from "firebase/firestore";
import { db } from "../config/firebase";

dayjs.locale("it");

export const LineFound = ({ report }) => {
  const navigate = useNavigate();

  const manageClick = async (e) => {
    e.preventDefault();
    navigate("../reports", { state: { ...report } });
    const dd = dayjs().diff(
      dayjs(report.startDate).format("DD/MM/YYYY"),
      "day"
    );

    console.log(dayjs(report.startDate).format("DD/MM/YYYY"), dd);
  };
  return (
    <tr onClick={(e) => manageClick(e)}>
      <th scope="row">{report.startDate}</th>
      <th scope="row">{report.endDate ? report.endDate : "run"}</th>
      <th scope="row">{report.cinema}</th>
      <th scope="row">{report.screen_number}</th>
      <th scope="row">{report.screen_with_issues}</th>
      <th scope="row">{report.seat_with_issues}</th>
      <th scope="row">{report.category}</th>
      <th scope="row">{report.screen_state}</th>
      <th scope="row">{report.issue}</th>
      <th scope="row">
        {report.resolved
          ? dayjs(report.endDate, "DD/MM/YYYY").diff(
              dayjs(report.startDate).format("DD/MM/YYYY"),
              "day"
            )
          : dayjs().diff(dayjs(report.startDate, "DD/MM/YYYY"), "day")}
      </th>

      {/* <th scope="row">{found.codfisc.toUpperCase()}</th>
      <td>{found.ticket ? found.ticket.toUpperCase() : "null"}</td>
      <td>{found.name ? found.name.toUpperCase() : "null"}</td>
      <td>{found.phone ? found.phone : "null"}</td>
      <td>{found.screen ? found.screen : "null"}</td>
      <td>{found.showtime ? found.showtime : "null"}</td> */}
    </tr>
  );
};

export default LineFound;
