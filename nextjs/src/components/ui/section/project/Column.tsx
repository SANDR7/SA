// import { PortableText } from "@portabletext/react";
// import React from "react";
// import ReactMarkdown from "react-markdown";

// import { urlFor } from "../../../../libs/sanity";
// import { PortableTextComponent } from "../sanity/portableText";

// const ColumText: React.FC<{
//   children: React.ReactNode;
//   title: string;
//   className?: string;
// }> = ({ children, title, className }) => {
//   return (
//     <div
//       className={`ml-7 mr-4 h-full min-w-[22rem] border-l p-[15px] ${className}`}
//     >
//       <b>
//         {title}
//         <span className="text-orange">:</span>{" "}
//       </b>
//       {children}
//     </div>
//   );
// };

// const ColumnImage: React.FC<any> = ({ title, src }) => {
//   const result = Array.isArray(src);

//   return result ? (
//     <ColumText title={title} className="w-[20rem]">
//       <div className="flex">
//         {src.map((img, idx) => (
//           <img src={urlFor(img).url()} alt="Img" key={idx} className="mx-3"/>
//         ))}
//       </div>
//     </ColumText>
//   ) : (
//     <ColumText title={title}>
//       <img src={urlFor(src).url()} alt="Image" />
//     </ColumText>
//   );
// };

// const ColumnItem: React.FC<any> = ({ ...column }) => {
//   switch (
//     column.design ||
//     column.tasks ||
//     column.testing ||
//     column.summery ||
//     column.persona ||
//     column.research ||
//     column.wireframes ||
//     column.concept
//   ) {
//     case column.summery:
//       return (
//         <ColumText title="Summery">
//           <ReactMarkdown>{column.summery}</ReactMarkdown>
//         </ColumText>
//       );
//     case column.tasks:
//       return (
//         <ColumText title="Responsibilities">
//           <PortableText
//             value={column.tasks}
//             components={PortableTextComponent}
//           />
//         </ColumText>
//       );
//     case column.testing:
//       return (
//         <ColumText title="Usability testing">
//           <PortableText
//             value={column.testing}
//             components={PortableTextComponent}
//           />
//         </ColumText>
//       );
//     case column.persona:
//       return (
//         <ColumText title="Target audience">
//           <PortableText
//             value={column.persona}
//             components={PortableTextComponent}
//           />
//         </ColumText>
//       );
//     case column.research:
//       return (
//         <ColumText title="Research">
//           <PortableText
//             value={column.research}
//             components={PortableTextComponent}
//           />
//         </ColumText>
//       );
//     case column.design: {
//       console.log("design", column.design);

//       return <ColumnImage title="Design" src={column.design} />;
//     }
//     case column.wireframes: {
//       console.log("wireframes", column.wireframes);

//       return <ColumnImage title="Wireframes" src={column.wireframes} />;
//     }

//     case column.concept:
//       return <div></div>;

//     default:
//       return null;
//   }

//   // return <pre>{JSON.stringify(column, null, 2)}</pre>;
// };

// export default ColumnItem;
