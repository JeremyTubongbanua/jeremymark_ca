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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

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

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
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
            <div key={index} onClick={() => openModal(image)}>
              <img
                src={`/assets/projects/${projectId}/gallery/${image}`}
                alt={`Gallery Image ${index + 1}`}
                className="w-auto max-h-[500px] h-auto object-cover mx-auto cursor-pointer"
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className="p-4 shadow-lg">
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          components={{
            h1: ({ node, ...props }) => (
              <h1 className="text-4xl font-bold mb-4" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-3xl font-semibold mb-3" {...props} />
            ),
            p: ({ node, ...props }) => (
              <p className="text-lg mb-2" {...props} />
            ),
            a: ({ node, ...props }) => (
              <a className="text-lg text-blue-500 underline" {...props} />
            ),
            li: ({ node, ...props }) => (
              <li className="text-lg list-disc ml-5 mb-1" {...props} />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

      {/* Modal for large image preview */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeModal}
        >
          <div className="relative p-4 max-w-5xl w-full">
            <img
              src={`/assets/projects/${projectId}/gallery/${selectedImage}`}
              alt="Large Preview"
              className="w-auto h-300 object-contain"
            />
            <button
              className="absolute top-0 right-0 m-4 text-white text-3xl font-bold"
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
