import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { ReservationsList } from "../components/ReservationsList";
import { store } from "../store/store";

export const MyReservationsScreen = observer(() => {
  useEffect(() => {
    store.myReservations();
  }, []);
  return <ReservationsList></ReservationsList>;
});
