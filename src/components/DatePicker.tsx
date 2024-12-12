import { TextField } from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
// import { serverAcceptedDate } from "@/utils/formats";

export default function DateFieldPicker({
    field,
    form,
    label,
    maxDate,
    minDate,
    disablePast,
    disabled,
    ...props
}: {
    field: any;
    form: any;
    label: any;
    maxDate?: any;
    disablePast?: boolean;
    minDate?: any;
    disabled?: boolean;
}) {
    const selectedDate = dayjs(field.value) || null;
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                {...field}
                {...props}
                format="DD-MM-YYYY"
                maxDate={maxDate}
                minDate={minDate}
                label={label}
                disablePast={disablePast}
                disabled={disabled}
                value={selectedDate}
                onChange={(date) => {
                    form.setFieldValue(field.name, date);
                }}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        bgcolor: "white",
                        color: "#003975",
                        border: "0.5px solid #003975",
                        outline: "0.5px solid #003975",
                        borderRadius: "4px", // Rounded corners for the input
                        "& .MuiSvgIcon-root": {
                            color: "#003975", // Color for the calendar icon
                        },
                    },
                    "& .MuiInputLabel-root": {
                        color: "#003975", // Default label color
                        fontSize: "14px", // Default font size
                        background:"white",
                        "&.Mui-focused": {
                            color: "#003975", // Label color when focused
                        },
                    },
                    // width:"100%",
                    width: "180px",
                    height: "35px",
                }}
                slotProps={{
                    textField: {
                        size: "small",
                    },
                }}
                renderInput={(params: any) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}
