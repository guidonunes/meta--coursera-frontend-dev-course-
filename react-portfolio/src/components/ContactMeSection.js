import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from "yup";
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";

const ContactMeSection = () => {
  const { isLoading, submit } = useSubmit();
  const { onOpen } = useAlertContext();
  const [submitResponse, setSubmitResponse] = useState(null);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      type: "hireMe",
      comment: "",
    },
    onSubmit: async (values) => {
      const response = await submit(values);
      setSubmitResponse(response);
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      type: Yup.string(),
      comment: Yup.string()
        .required("Required")
        .min(25, "Must be at least 25 characters"),
    }),
  });

  useEffect(() => {
    if (submitResponse) {
      if (submitResponse.type === "success") {
        onOpen(
          "success",
          `Form submitted successfully by ${formik.values.firstName}!`
        );
        formik.resetForm();
      } else if (submitResponse.type === "error") {
        onOpen("error", "Form submission failed!");
      }
    }
  }, [submitResponse, formik, onOpen]);

    return (
        <FullScreenSection
          isDarkBackground
          backgroundColor="#512DA8"
          py={16}
          spacing={8}
        >
          <VStack w="1024px" p={32} alignItems="flex-start">
            <Heading as="h1" id="contactme-section">
              Contact me
            </Heading>
            <Box p={6} rounded="md" w="100%">
              <form onSubmit={formik.handleSubmit}>
                <VStack spacing={4}>
                  <FormControl isInvalid={formik.touched.firstName && formik.errors.firstName}>
                    <FormLabel htmlFor="firstName">Name</FormLabel>
                    <Input
                      id="firstName"
                      name="firstName"
                      {...formik.getFieldProps("firstName")}
                    />
                    <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={formik.touched.email && formik.errors.email}>
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      {...formik.getFieldProps("email")}
                    />
                    <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                    <Select id="type" name="type" {...formik.getFieldProps("type")}>
                      <option value="hireMe" style={{color: "#36454F"}}>Freelance project proposal</option>
                      <option value="openSource" style={{color: "#36454F"}}>
                        Open source consultancy session
                      </option>
                      <option value="other" style={{color: "#36454F"}}>Other</option>
                    </Select>
                  </FormControl>

                  <FormControl isInvalid={formik.touched.comment && formik.errors.comment}>
                    <FormLabel htmlFor="comment">Your message</FormLabel>
                    <Textarea
                      id="comment"
                      name="comment"
                      height={250}
                      {...formik.getFieldProps("comment")}
                    />
                    <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
                  </FormControl>
                  <Button type="submit" colorScheme="purple" width="full" isLoading={isLoading}>
                    Submit
                  </Button>
                </VStack>
              </form>
            </Box>
          </VStack>
        </FullScreenSection>
      );
    };
    
    export default ContactMeSection;
    