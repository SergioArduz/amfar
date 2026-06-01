import MainLayout from "../layouts/MainLayout";

import useCalendario from "../hooks/useCalendario";

import {
    Calendar,
    momentLocalizer,
} from "react-big-calendar";

import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer =
    momentLocalizer(moment);

export default function CalendarioPage() {
    const { eventos } =
        useCalendario();

    return (
        <MainLayout>
            <h1 className="text-3xl font-bold mb-6">
                Calendario Académico
            </h1>

            <div className="bg-white rounded-xl shadow p-5 h-[750px]">
                <Calendar
                    localizer={localizer}
                    events={eventos}
                    startAccessor="start"
                    endAccessor="end"
                />
            </div>
        </MainLayout>
    );
}