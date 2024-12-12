import React from "react";
import { TextField } from "@mui/material";

// Define the type of props to extend Material UI's TextField props
interface CustomTextFieldProps {
    label?: string;
    value?: string;
    type?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
    label,
    value,
    type,
    onChange,
    ...rest
}) => {
    return (
        <TextField
            label={label}
            value={value}
            type={type}
            onChange={onChange}
            fullWidth
            margin={"normal"}
            variant={"outlined"}
            sx={{
                input: {
                    padding: "8px 12px", // Adjust input padding for reduced height
                },
                "& .MuiOutlinedInput-root": {
                    borderRadius: "8px", // Adds rounded corners
                },
            }}
            InputLabelProps={{
                style: { fontSize: "14px", color: "#666" }, // Custom label styles
            }}
            InputProps={{
                style: { fontSize: "14px", height: "45px" }, // Adjust input font size and height
            }}
            {...rest} // Allows passing additional props
        />
    );
};

export default CustomTextField;
