import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProjectPage = () => {
  const { projectId } = useParams();
  const [content, setContent] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch(
          `/assets/projects/${projectId}/content.md`
        );
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error("Error loading content:", error);
        setContent("# Error loading content");
      }
    };

    const loadGallery = async () => {
      try {
        const response = await fetch(
          `/assets/projects/${projectId}/gallery/gallery.json`
        );
        const images = await response.json();
        setGalleryImages(images);
      } catch (error) {
        console.error("Error loading gallery:", error);
        setGalleryImages([]);
      }
    };

    loadContent();
    loadGallery();
  }, [projectId]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          centerPadding: "0px",
        },
      },
    ],
  };

  return (
    <div className="container mx-auto p-8">
      <div
        className="relative w-full h-64 bg-cover bg-center"
        style={{
          backgroundImage: `url(/assets/projects/${projectId}/thumbnail.png)`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white">
          {content.split("\n")[0].replace("#", "").trim()}
        </h1>
      </div>

      <div className="bg-purple-400 py-8">
        <h2 className="text-3xl text-center font-bold text-white mb-4">
          Gallery
        </h2>
        <Slider {...sliderSettings}>
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative w-full h-[500px] flex items-center justify-center bg-purple-500"
            >
              <img
                src={`/assets/projects/${projectId}/gallery/${image}`}
                alt={`Gallery Image ${index + 1}`}
                className="mx-auto object-contain max-h-full max-w-full h-[500px]"
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className="p-4 rounded shadow-md mt-8">
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          components={{
            h1: ({ node, ...props }) => (
              <h1 className="font-inter text-8xl font-bold mb-4" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="font-inter text-4xl font-semibold mb-3" {...props} />
            ),
            p: ({ node, ...props }) => (
              <p className="font-inter text-lg mb-2" {...props} />
            ),
            a: ({ node, ...props }) => (
              <a className="font-inter text-lg text-blue-500 underline" {...props} />
            ),
            li: ({ node, ...props }) => (
              <li className="font-inter text-lg list-disc ml-5 mb-1" {...props} />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default ProjectPage;
