// import { Box, Card, Container } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../store/store.tsx";
// import { getBlog } from "../../store/employeeSlice.tsx";
// import Loading from "../Loading/Loading.tsx";
// import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

// const Home = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { allBlogLoading, allBlogData } = useSelector<RootState>(
//     (state) => state.employee
//   );
//   const [decodedBlogs, setDecodedBlogs] = useState<string[]>([]);
//   console.log(decodedBlogs[0]);
//   console.log(decodedBlogs[1]);
//   console.log(decodedBlogs[2]);
//   // console.log(decodedBlogs[10]);
//   useEffect(() => {
//     dispatch(getBlog());
//   }, [dispatch]);

//   useEffect(() => {
//     if (allBlogData && allBlogData.length > 0) {
//       const decodedDataArray = allBlogData.map((blog) => {
//         let base64Data = blog.base64_data;

//         // Check if the data is prefixed with "data:text/html;base64,"
//         const base64Prefix = "data:text/html;base64,";
//         if (base64Data.startsWith(base64Prefix)) {
//           // Remove the prefix before decoding
//           base64Data = base64Data.slice(base64Prefix.length);
//         }

//         try {
//           // Decode the base64 data
//           const decodedData = atob(base64Data); // Decode the base64 string into an HTML string
//           return decodedData;
//         } catch (e) {
//           console.error("Error decoding base64:", e);
//           return ""; // In case of error, return an empty string
//         }
//       });

//       setDecodedBlogs(decodedDataArray);
//     }
//   }, [allBlogData]);

//   console.log(decodedBlogs, "Decoded Data");

//   return (
//     <Box>
//       {allBlogLoading ? (
//         <Loading />
//       ) : (
//         <Container>
//           {decodedBlogs.map((decodedData, index) => (
//             <Card
//               key={index}
//               sx={{
//                 // display: isClicked ? "block" : "none",
//                 boxShadow:
//                   "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
//                 minHeight: "100px",
//                 p: "10px",
//                 mb: "10px",
//               }}
//             >
//               <FroalaEditorView key={index} model={decodedData} />
//             </Card>
//           ))}
//         </Container>
//       )}
//     </Box>
//   );
// };

// export default Home;

import { Box, Card, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store.tsx";
import { getBlog } from "../../store/employeeSlice.tsx";
import Loading from "../Loading/Loading.tsx";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { allBlogLoading, allBlogData } = useSelector<RootState>(
    (state) => state.employee
  );
  const [decodedBlogs, setDecodedBlogs] = useState<string[]>([]);

  useEffect(() => {
    dispatch(getBlog());
  }, [dispatch]);

  useEffect(() => {
    if (allBlogData && allBlogData.length > 0) {
      const decodedDataArray = allBlogData.map((blog) => {
        let base64Data = blog.base64_data;
        const base64Prefix = "data:text/html;base64,";
        if (base64Data.startsWith(base64Prefix)) {
          base64Data = base64Data.slice(base64Prefix.length);
        }

        try {
          const decodedData = atob(base64Data); // Decode base64 to HTML string
          return decodedData;
        } catch (e) {
          console.error("Error decoding base64:", e);
          return "";
        }
      });

      setDecodedBlogs(decodedDataArray);
    }
  }, [allBlogData]);

  console.log(decodedBlogs, "Decoded Data");

  return (
    <Box>
      {allBlogLoading ? (
        <Loading />
      ) : (
        <Container>
          {decodedBlogs.map((decodedData, index) => (
            <Card
              key={index}
              sx={{
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                minHeight: "100px",
                p: "10px",
                mb: "10px",
              }}
            >
              <FroalaEditorView model={decodedData} />
            </Card>
          ))}
        </Container>
      )}
    </Box>
  );
};

export default Home;
