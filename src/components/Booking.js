import React, { useLayoutEffect, useState } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import Check from "@kiwicom/orbit-components/lib/icons/Check";
import CallOutBanner from "@kiwicom/orbit-components/lib/CallOutBanner";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";
import List from "@kiwicom/orbit-components/lib/List";
import ListItem from "@kiwicom/orbit-components/lib/List/ListItem";
import Select from "@kiwicom/orbit-components/lib/Select";
import Button from "@kiwicom/orbit-components/lib/Button";

import * as firebase from "firebase";

import "react-big-calendar/lib/css/react-big-calendar.css";
const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

export const events = [];

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Booking = () => {
  const [times, setTimes] = useState({});

  const [derivedTimes, setDerivedTimes] = useState([]);

  const [services, setServices] = useState([]);

  const db = firebase.firestore();

  const onSelect = (eventData) => {
    const slots = eventData.slots ?? [];
    if (slots.length === 2) {
      setTimes({
        id: JSON.stringify(slots[0]) + JSON.stringify(slots[1]),
        title: "",
        start: slots[0],
        end: slots[1],
      });
    }
  };

  const newTimes = JSON.parse(JSON.stringify(derivedTimes));
  newTimes.push(times);

  useLayoutEffect(() => {
    db.collection("services")
      .get()
      .then((services) => {
        const servicesData = services.docs.map((doc) => doc.data());
        console.log(servicesData);
        setServices(servicesData);
      });
    db.collection("bookings")
      .get()
      .then((bookings) => {
        const bookingsData = bookings.docs.map((doc) => doc.data());
        console.log(bookingsData);
      });
  }, []);
  return (
    <div>
      <Calendar
        step={60}
        timeslots={1}
        min={new Date(0, 0, 0, 9, 0, 0)}
        max={new Date(0, 0, 0, 17, 0, 0)}
        selectable
        localizer={localizer}
        events={newTimes}
        defaultView={Views.WEEK}
        scrollToTime={new Date(1970, 1, 1, 6)}
        defaultDate={new Date()}
        onSelectEvent={(event) => alert(event.title)}
        style={{ height: 500 }}
        onSelectSlot={onSelect}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          marginTop: 20,
        }}
      >
        <CallOutBanner
          dataTest="test"
          description="Select your if you would like a Hair Cut, Hair Wash & Dry or a Hair Colouring"
          illustration={<Illustration name="EnjoyApp" size="small" />}
          title="Make a booking"
        >
          <List type="secondary">
            <ListItem icon={<Check color="success" />}>
              Cheap service fees
            </ListItem>
            <ListItem icon={<Check color="success" />}>
              Best quality products only
            </ListItem>
          </List>
          <Select
            options={services.map((data) => {
              return { label: data.name + "  $" + data.price, id: data.name };
            })}
          />
          <Button>Make Booking</Button>
        </CallOutBanner>
      </div>
    </div>
  );
};

export default Booking;
