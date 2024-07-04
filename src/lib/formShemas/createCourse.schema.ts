import { z } from "zod";

export const courseFormSchema = z.object({
  name: z.string().min(1, "Course name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price must be a positive number"),
  estimatedPrice: z.string(),
  tags: z.string().min(1, "Tags are required"),
  courseDuration: z.string().min(1, "Course Duration Required"),
  category: z.string().min(1, "Category is Required"),
  subcategory: z.string().min(1, "Subcategory is Required"),
  level: z.string().min(1, "Level is required"),
  demoUrl: z.string().url("Invalid URL for demo"),
  thumbnail: z.string().min(1, "Thumbnail is Required"),
  thumbnailFile: z.any(),
  benefits: z
    .array(
      z.object({
        title: z.string().min(1, "Benefit is required"),
      })
    )
    .nonempty("Benefits is required"),
  prerequistites: z
    .array(
      z.object({
        title: z.string().min(1, "Prerequistites is required"),
      })
    )
    .nonempty("Prerequisites is required"),
  details: z
    .array(
      z.object({
        title: z.string().min(1, "Details is required"),
      })
    )
    .nonempty("Details is required"),
  courseData: z.array(
    z.object({
      videoTitle: z.string().min(1, "Video title is required"),
      videoDescription: z.string().min(1, "Video description is required"),
      videoUrl: z.string().url("Invalid URL for video"),
      videoSection: z.string().min(1, "Video section is required"),
      videoPlayer: z.string().min(1, "Video player is required"),
      videoLength: z.string().min(1, "Video length is required"),
      videoResource: z
        .array(
          z.object({
            title: z.string(),
            url: z.string(),
          })
        )
        .optional(),
    })
  ),
});

export const updateCourseFormSchema = z.object({
  name: z.string().min(1, "Course name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price must be a positive number"),
  estimatedPrice: z.string(),
  tags: z.string().min(1, "Tags are required"),
  courseDuration: z.string().min(1, "Course Duration Required"),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  level: z.string().min(1, "Level is required"),
  demoUrl: z.string().url("Invalid URL for demo"),
  thumbnail: z.string().optional(),
  thumbnailFile: z.any(),
  benefits: z
    .array(
      z.object({
        title: z.string().min(1, "Benefit is required"),
      })
    )
    .nonempty("Benefits is required"),
  prerequistites: z
    .array(
      z.object({
        title: z.string().min(1, "Prerequistites is required"),
      })
    )
    .nonempty("Prerequisites is required"),
  details: z
    .array(
      z.object({
        title: z.string().min(1, "Details is required"),
      })
    )
    .nonempty("Details is required"),
  courseData: z.array(
    z.object({
      videoTitle: z.string().min(1, "Video title is required"),
      videoDescription: z.string().min(1, "Video description is required"),
      videoUrl: z.string().url("Invalid URL for video"),
      videoSection: z.string().min(1, "Video section is required"),
      videoPlayer: z.string().min(1, "Video player is required"),
      videoLength: z.string().min(1, "Video length is required"),
      videoResource: z
        .array(
          z.object({
            title: z.string(),
            url: z.string(),
          })
        )
        .optional(),
    })
  ),
});
