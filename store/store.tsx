import axios from "axios";
import _ from "lodash";
import { types, Instance } from "mobx-state-tree";

const { string, number, identifierNumber, array, model, maybeNull } = types;

var formData = new FormData();
formData.append("email", "leonlav77777@gmail.com");
formData.append("password", "password");
formData.append("password_confirmation", "password");
formData.append("name", "leki");

export const UserModel = model("UserModel", {
  created_at: string,
  email: string,
  email_verified_at: maybeNull(string),
  id: identifierNumber,
  name: string,
  updated_at: string,
});

export const DayModel = model("DayModel", {
  created_at: string,
  date: string,
  id: identifierNumber,
  reservationID: maybeNull(number),
  status: string,
  updated_at: maybeNull(string),
  time: number,
});

export const ReservationModel = model("ReservationModel", {
  created_at: string,
  date: string,
  day_id: number,
  expiryDate: maybeNull(string),
  id: identifierNumber,
  time: number,
  updated_at: maybeNull(string),
  user_id: number,
});

const Store = model("store", {
  days: array(string),
  fullNameDays: array(string),
  months: array(string),
  currentMonth: number,
  currentYear: number,
  daysInMonth: array(string),
  currentDay: number,
  dayData: array(DayModel),
  userInfos: maybeNull(UserModel),
  selectedDay: "",
  selectedMonth: "",
  selectedYear: "",
  availableDates: array(string),
  date: "",
  datesWithWeekDays: array(string),
  IDsForWeekDays: array(number),
  // datesWithWeekDays: array(string),
  filteredByDays: array(string),
  reservationList: array(ReservationModel),
  filteredDaysByDate: array(DayModel),
  freeHours: array(model({ date: string, time: number })),
})
  .actions((self) => {
    return {
      addToDatesWithWeekDays(date: string, weekDay: string) {
        if (date == "") {
          return;
        }
        self.datesWithWeekDays.push(date + " " + weekDay);
      },
      addIDs(date: number) {
        self.IDsForWeekDays.push(date);
      },
      setDays(day: number) {
        self.daysInMonth.push(day.toString());
      },
      addBlanks(blanks: number) {
        if (blanks < 7) {
          for (let i = 0; i < blanks; i++) {
            self.daysInMonth.unshift(" ");
          }
        }
      },
      nextMonth() {
        if (self.currentMonth == 11) {
          self.currentYear += 1;
          return (self.currentMonth = 0);
        }
        self.currentMonth += 1;
      },
      prevMonth() {
        if (self.currentMonth == 0) {
          self.currentYear -= 1;
          return (self.currentMonth = 11);
        }
        self.currentMonth -= 1;
      },
      clearDays() {
        self.daysInMonth.clear();
      },
      getDayData(data: any) {
        self.dayData.push(data);
      },
      setUserInfo(data: Instance<typeof UserModel> | string) {
        if (typeof data == "string") {
          return (self.userInfos = null);
        }
        self.userInfos = data;
        //that myb works...
      },
      addToAvailableDates(date: any) {
        // for (let el of dates) {
        //   let date =
        //     el.date.split("-")[0] +
        //     "-" +
        //     el.date.split("-")[1] +
        //     "-" +
        //     el.date.split("-")[2];
        if (date.startsWith("0")) {
          self.availableDates.push(date.replace("0", ""));
          return;
        }
        self.availableDates.push(date);
      },
      setAvailableDatesData(day: string, month: string, year: string) {
        self.selectedDay = day;
        self.selectedMonth = month;
        self.selectedYear = year;
      },
      setDate(date: string) {
        self.date = date;
      },
      toggleReservations(id: number) {
        self.dayData[id].status = "occupied";
      },
      clearDayData() {
        self.dayData.clear();
      },
      addToReservationList(reservation: Instance<typeof ReservationModel>) {
        self.reservationList.push(reservation);
      },
      addToFilteredByDays(date: string) {
        self.filteredByDays.push(date);
      },
      addToFIlteredDaysByDate(dates: Instance<typeof DayModel>[]) {
        for (let date of dates) {
          self.filteredDaysByDate.push(date);
        }
      },
      addToFreeHours(date: string, time: number) {
        self.freeHours.push({ date, time });
      },
      clearFreeHours() {
        self.freeHours.clear();
      },
      clearFilteredByDays() {
        self.filteredByDays.clear();
      },
      getCompletedDates(day: any, id: any): any {
        let completeDay;
        let completeMonth;
        let weekDayId = id % 7;
        if (parseInt(day) < 10) {
          completeDay = ["0"].concat(day.split("")).join("");
        } else {
          completeDay = day;
        }
        if (store.currentMonth + 1 < 10) {
          completeMonth = "0" + (store.currentMonth + 1);
        } else {
          completeMonth = store.currentMonth + 1;
        }
        if (store.daysInMonth[id] != " ") {
          store.addToDatesWithWeekDays(
            store.currentYear + "-" + completeMonth + "-" + completeDay,
            store.days[weekDayId]
          );
        }
        return { completeDay, completeMonth };
      },
    };
  })
  .views((self) => {
    return {
      get getDaysInMonth() {
        const days = new Date(
          self.currentYear,
          self.currentMonth + 1,
          0
        ).getDate();
        for (let i = 1; i <= days; i++) {
          self.setDays(i);
        }
        return;
      },
    };
  })
  .actions((self) => {
    return {
      // login: (email: string, password: string) => {
      //   axios({
      //     method: "post",
      //     url: "http://larareserve.ddns.net/react/login",
      //     data: {
      //       email,
      //       password,
      //     },
      //     headers: {
      //       "content-type": "application/json",
      //     },
      //   })
      //     .then((res: any) => {
      //       console.log("LOGIN SUCCESS");
      //     })
      //     .catch((err) => {
      //       console.log("LOIGN ERROR");
      //     });
      // },
      // register: () => {
      //   axios({
      //     method: "post",
      //     url: "http://larareserve.ddns.net/react/register",
      //     data: formData,
      //   })
      //     .then((res: any) => {
      //       console.log("REGISTER SUCCESS");
      //       console.log(res);
      //     })
      //     .catch((err) => {
      //       console.log("REGISTER ERROR");
      //     });
      // },
      // islogged: () => {
      //   axios({
      //     method: "get",
      //     url: "http://larareserve.ddns.net/checkIfLoggedIn",
      //   })
      //     .then((res: any) => {
      //       console.log(res);
      //       if (res == undefined) {
      //         return res.data;
      //       }
      //       console.log("ISLOGGED SUCCESS");
      //     })
      //     .catch((err) => {
      //       console.log("IS LOGGED ERROR");
      //     });
      // },
      // logout: () => {
      //   axios({
      //     method: "post",
      //     url: "http://larareserve.ddns.net/react/logout",
      //     headers: {
      //       "content-type": "application/json",
      //     },
      //   })
      //     .then((res: any) => {
      //       console.log("LOGOUT SUCCESS");
      //     })
      //     .catch((err) => {
      //       console.log("LOGOUT ERROR");
      //     });
      // },
      // userInfo: () => {
      //   axios({
      //     method: "get",
      //     url: "http://larareserve.ddns.net/userInfo",
      //   })
      //     .then((res) => {
      //       console.log("USER INFO SUCCESS");
      //       let skip: any = res.data;
      //       self.setUserInfo(skip);
      //     })
      //     .catch((err) => {
      //       console.log("USERINFO ERROR");
      //     });
      // },
      getDateSpecifics: () => {
        axios({
          method: "get",
          url: "http://larareserve.ddns.net/all",
        })
          .then((res: any) => {
            if (self.filteredDaysByDate.length == 0) {
              self.addToFIlteredDaysByDate(res.data);
            }
            console.log("DATE SPECIFICS SUCCESS");
            if (self.availableDates.length == 0) {
              res.data.map((el: any) => {
                self.addToAvailableDates(
                  el.date.split("-")[0] +
                    "-" +
                    el.date.split("-")[1] +
                    "-" +
                    el.date.split("-")[2]
                );
              });
            } else {
              for (let data of res.data) {
                if (data.date == self.date) {
                  self.getDayData(data);
                }
              }
            }
            // if (self.availableDates.length == 0) {
            //   self.addToAvailableDates(res.data);
            //   self.addToFIlteredDaysByDate(res.data);
            // } else {
            //   self.getDayData(res.data);
            // }
            // if (self.availableDates.length == 0) {
            //   res.data.map((el: any) => {
            //     self.addToAvailableDates(
            //       el.date.split("-")[0] +
            //         "-" +
            //         el.date.split("-")[1] +
            //         "-" +
            //         el.date.split("-")[2]
            //     );
            //     // self.addToFIlteredDaysByDate(el);
            //   });
            // } else {
            //   for (let data of res.data) {
            //     if (data.date == self.date) {
            //       self.getDayData(data);
            //     }
            //   }
            // }
          })
          .catch((err) => {
            console.log("DATE SPECIFIC ERROR");
          });
      },
      reserveDate: (date: string, time: number) => {
        axios({
          method: "post",
          url: "http://larareserve.ddns.net/reserveDate",
          data: {
            date,
            time,
          },
        })
          .then((res: any) => {
            console.log("RESERVE DATE SUCCESS");
          })
          .catch((err) => {
            console.log("RESERVE DATE ERROR");
          });
      },
      myReservations: () => {
        axios({
          method: "get",
          url: "http://larareserve.ddns.net/myReservations",
        })
          .then((res: any) => {
            console.log("MYRESERVAIONS SUCCESS");
            for (let reservation of res.data) {
              self.addToReservationList(reservation);
            }
          })
          .catch((err) => {
            console.log("MYRESERVAIONS ERROR");
          });
      },
    };
  })
  .views((self) => {
    return {
      get getAvailableDates() {
        return _.uniq(self.availableDates);
      },
    };
  });

export const store = Store.create({
  days: ["Pon", "Uto", "Sri", "Čet", "Pet", "Sub", "Ned"],
  fullNameDays: [
    "Ponedjeljak",
    "Utorak",
    "Srijeda",
    "Četvrtak",
    "Petak",
    "Subota",
    "Nedjelja",
  ],
  months: [
    "Siječanj",
    "Veljača",
    "Ožujak",
    "Travanj",
    "Svibanj",
    "Lipanj",
    "Srpanj",
    "Kolovoz",
    "Rujan",
    "Listopad",
    "Studeni",
    "Prosinac",
  ],
  currentMonth: new Date().getMonth(),
  currentYear: new Date().getFullYear(),
  currentDay: new Date().getUTCDate(),
  userInfos: null,
});
