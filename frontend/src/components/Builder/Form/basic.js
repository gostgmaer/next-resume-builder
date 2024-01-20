import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { FaRupeeSign } from "react-icons/fa";
import { Country, State, City } from "country-state-city";
import { useParams } from "next/navigation";

import { notifySuccess, notifyinfo } from "@/lib/notify/notice";
import {
  MdLandscape,
} from "react-icons/md";
import { patch, post } from "@/lib/http";
import Input from "@/components/global/fields/input";
import SelectField from "@/components/global/fields/SelectField";
import MultiImageUploadr from "@/components/global/fields/multiImageUploadr";

export const BasicForm = ({ props, initialValues }) => {
  const params = useParams();
  const [file, setFile] = useState([]);
  const [hostimg, setHostimg] = useState(undefined);

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log(values);
      handleSubmit();
    },
  });

  const propertType = [
    {
      id: 1,
      type: "Residential",
      attributes: ["House", "Apartment", "Condo", "Townhouse"],
    },
    {
      id: 2,
      type: "Commercial",
      attributes: ["Office", "Retail", "Industrial"],
    },
    {
      id: 3,
      type: "Land",
      attributes: ["Agricultural", "Residential", "Commercial"],
    },
    {
      id: 4,
      type: "Vacation",
      attributes: ["Cabin", "Beach House", "Mountain Retreat"],
    },
  ];

  const furnishedoptions = [
    { value: "1", label: "Furnished" },
    { value: "2", label: "Semi-Furnished" },
    { value: "3", label: "Not Furnished" },
  ];

  const handleSubmit = (second) => {
    const { id } = params;

    if (id) {
      handleUpdate(formik.values, id);
    } else {
      handleSave(formik.values);
    }
  };

  const handleUpdate = async (values, id) => {
    console.log(id, params);
    const body = generateBody(values);
    const request = await patch(`/realstate/record`, body, id);
    if (request.status === "OK") {
      notifyinfo(request.message, 5000);
    }
  };

  const handleSave = async (values) => {
    const body = generateBody(values);
    const request = await post(`/realstate/record`, body);
    if (request.status === "Created") {
      notifySuccess(request.message, 5000);
    }
  };

  const generateBody = (values) => {
    const body = {
      ...values,
      images: file,
      host: { ...values.host, host_image: hostimg },
    };

    return body;
  };

  return (
    <div className=" bg-white max-w-7xl m-auto rounded-xl dark:bg-gray-700 p-5">
      <form
        onSubmit={formik.handleSubmit}
        className=" mx-auto mt-8 p-5 bg-gray-50 dark:bg-gray-900 grid rounded-lg"
      >
        <div className="  w-5/6 mx-auto mt-8 grid  gap-3 sm:grid-cols-2 col-span-full">
          <h2 className="col-span-full text-2xl font-semibold mb-2">
            Basic Info
          </h2>
          <div className="sm:col-span-1">
            <Input
              label={"Property Name"}
              type={"text"}
              additionalAttrs={{
                ...formik.getFieldProps("name"),
                placeholder: "Name",
              }}
              classes={undefined}
              icon={<MdLandscape />}
              id={"name"}
            />
            {formik.errors.name && formik.touched.name && (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            )}
          </div>
          <div className="sm:col-span-1">
            <SelectField
              options={propertType}
              id={"type"}
              label={"Property Type"}
              additionalAttrs={{ ...formik.getFieldProps("type") }}
              placeholder={"Select"}
              optionkeys={{ key: "id", value: "type" }}
            />

            {formik.errors.type && formik.touched.type && (
              <div className="text-red-500 text-sm">{formik.errors.type}</div>
            )}
          </div>
       
         
       
          <div className="col-span-full">
            <MultiImageUploadr
              selectedFiles={file}
              setSelectedFiles={setFile}
              label={"Property Images"}
            />
          </div>
          <div className="col-span-full">
            <span className=" block text-sm capitalize font-semibold  mb-1.5">
              Descriptions :{" "}
            </span>
            <textarea
              rows={5}
              id="description"
              required
              placeholder="your Details "
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.description}
              name="description"
              className="resize-none border rounded-md placeholder:capitalize p-2 w-full focus:outline-none focus:ring focus:border-blue-300"
            />
            {formik.errors.description && formik.touched.description && (
              <div className="text-red-500 text-sm">
                {formik.errors.description}
              </div>
            )}
          </div>
        </div>

    
      </form>
    </div>
  );
};
