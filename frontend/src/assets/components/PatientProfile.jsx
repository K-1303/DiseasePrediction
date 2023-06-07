import React from "react";
import Calendar from "./Calendar";
import Sidebar from "./Sidebar";
import { useState } from "react";
import Record from "./Record";
import dashboardHero from "../img/dashboard-hero.svg";
import BP_chart from "./BP_chart";
import LogModal from "./LogModal";
import BP_Log from "./BP_Log";
import ProfileModal from "./ProfileModal";
import GlucoseLevel from "./GlucoseLevel";
import Sugar_chart from "./Sugar_chart";
import CurrentMedications from "./CurrentMedications";
const PatientProfile = ({ responseData }) => {
  const [record, setRecord] = useState(false);
  const [logModal, setLogModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const {
    age,

    first_name,

    last_name,
  } = responseData;

  if (responseData.new_patient) {
    return null;
  }
  return (
    <div className="profile flex justify-center flex-col items-center pb-4">
      {Object.keys(responseData).length > 0 ? (
        <>
          <div className="w-full flex flex-wrap justify-center gap-2">
            <div className="bg-gray-800 w-5/6 md:p-2 sm:w-1/6 lg:w-1/12 h-full sm:h-screen rounded-md">
              <Sidebar
                setRecord={setRecord}
                setLogModal={setLogModal}
                setProfileModal={setProfileModal}
              />
            </div>
            <div className="h-screen md:fit-content w-96 sm:w-3/4 lg:w-2/5 bg-white  flex flex-col justify-start items-center">
              <div className="pt-6 h-40 w-full p-1 justify-between flex items-center greeting">
                <div className="w-full md:w-1/2  md:block text-3xl font-semibold text-gray-800 pl-5 ">
                  <p>Hi, {first_name + " " + last_name}</p>
                  <p>Check your</p>
                  <p>Health!</p>
                </div>
                <div className="w-1/3 h-5/6 rounded flex justify-center">
                  <img src={dashboardHero} alt="" className="h-full" />
                </div>
              </div>
              <div className="charts-container w-full rounded-md flex flex-wrap h-96 sm:h-1/3 py-2">
                <div className="w-full sm:w-1/2 rounded-md ">
                  <BP_chart chartData={responseData.bp_log} />
                </div>
                <div className="w-full  sm:w-1/2 rounded-md">
                  <Sugar_chart chartData={responseData.blood_glucose} />
                </div>
              </div>
              <div className=" mt-2 w-full h-80 sm:h-96 md:h-1/2 rounded-md overflow-scroll bg-white border shadow">
                <CurrentMedications responseData={responseData} />
              </div>
            </div>
            <div className="sm:w-full px-8 lg:px-0 lg:w-1/2 gap-2 p-1  flex flex-col items-center">
              <div className="w-full flex flex-wrap lg:flex-nowrap justify-center">
                <div className="flex w-96 sm:w-3/5 md:w-1/2">
                  <Calendar />
                </div>

                <div className="w-96 mt-2 sm:mt-0 sm:w-2/5 md:w-1/2 h-96 sm:h-full  bg-green-300 rounded-md"></div>
              </div>
              <div className="lg:h-full justify-center w-full flex-wrap sm:flex-nowrap flex gap-2">
                <div className="w-96 h-96 md:w-1/2 lg:h-full rounded-md overflow-scroll m-1 border p-1 flex flex-col">
                  <h2 className="font-semibold text-2xl py-1 text-teal-900 text-center">
                    Glucose
                  </h2>
                  <div className="flex-grow">
                    <GlucoseLevel responseData={responseData} />
                  </div>
                </div>
                <div className="w-96 h-96 md:w-1/2 lg:h-full rounded-md overflow-scroll  border m-1 p-1 flex flex-col">
                  <h2 className="font-semibold text-2xl text-gray-900 text-center p-2">
                    Blood Pressure
                  </h2>
                  <div className="flex-grow">
                    <BP_Log responseData={responseData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div>
            <p>Medical History: {medical_history.join(",")}</p>
            
            <p>Height: {height}</p>
            <p>Weight: {weight}</p>
            <p>Current Medication: {current_med.join(",")}</p>
            
          </div> */}
          <Record setRecord={setRecord} record={record} />
          <LogModal setLogModal={setLogModal} logModal={logModal} />
          <ProfileModal
            setProfileModal={setProfileModal}
            profileModal={profileModal}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PatientProfile;
