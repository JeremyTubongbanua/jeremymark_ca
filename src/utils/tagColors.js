export const getTagColor = (category) => {
    switch (category) {
       case "language":
          return "bg-green-500 text-white";
       case "field":
          return "bg-yellow-400 text-black";
       case "tech":
          return "bg-purple-500 text-white";
       case "progress":
          return "bg-orange-500 text-white";
       case "association":
          return "bg-red-500 text-white";
       default:
          return "bg-gray-400 text-white";
    }
 };