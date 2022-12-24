export enum FileType {
  application = "application",
  audio = "audio",
  font = "font",
  image = "image",
  text = "text",
  video = "video",
  invalid = "invalid",
}

export function determineFileType(mimeType: keyof typeof MimeTypes): FileType {
  switch (mimeType) {
    case "application/epub+zip":
    case "application/gzip":
    case "application/json":
    case "application/msword":
    case "application/pdf":
    case "application/vnd.ms-excel":
    case "application/vnd.ms-fontobject":
    case "application/vnd.ms-powerpoint":
    case "application/vnd.oasis.opendocument.presentation":
    case "application/vnd.oasis.opendocument.spreadsheet":
    case "application/vnd.oasis.opendocument.text":
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    case "application/vnd.rar":
    case "application/x-7z-compressed":
    case "application/x-tar":
    case "application/zip":
      return FileType.application;
    case "audio/aac":
    case "audio/midi":
    case "audio/mpeg":
    case "audio/ogg":
    case "audio/wav":
    case "audio/webm":
      return FileType.audio;
    case "font/ttf":
    case "font/woff":
    case "font/woff2":
      return FileType.font;
    case "image/gif":
    case "image/jpeg":
    case "image/png":
    case "image/svg+xml":
    case "image/tiff":
    case "image/webp":
      return FileType.image;
    case "text/csv":
    case "text/html":
    case "text/plain":
    case "text/xml":
      return FileType.text;
    case "video/mp4":
    case "video/mpeg":
    case "video/ogg":
    case "video/webm":
    case "video/x-msvideo":
    case "video/quicktime":
      return FileType.video;
    default:
      return FileType.invalid;
  }
}

/** List of contentType files.
 * https://docs.w3cub.com/http/basics_of_http/mime_types/complete_list_of_mime_types.html
 */
export enum MimeTypes {
  "application/epub+zip" = "application/epub+zip",
  "application/gzip" = "application/gzip",
  "application/json" = "application/json",
  "application/msword" = "application/msword",
  "application/pdf" = "application/pdf",
  "application/vnd.ms-excel" = "application/vnd.ms-excel",
  "application/vnd.ms-fontobject" = "application/vnd.ms-fontobject",
  "application/vnd.ms-powerpoint" = "application/vnd.ms-powerpoint",
  "application/vnd.oasis.opendocument.presentation" = "application/vnd.oasis.opendocument.presentation",
  "application/vnd.oasis.opendocument.spreadsheet" = "application/vnd.oasis.opendocument.spreadsheet",
  "application/vnd.oasis.opendocument.text" = "application/vnd.oasis.opendocument.text",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation" = "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.rar" = "application/vnd.rar",
  "application/x-7z-compressed" = "application/x-7z-compressed",
  "application/x-tar" = "application/x-tar",
  "application/zip" = "application/zip",
  "audio/aac" = "audio/aac",
  "audio/midi" = "audio/midi",
  "audio/mpeg" = "audio/mpeg",
  "audio/ogg" = "audio/ogg",
  "audio/wav" = "audio/wav",
  "audio/webm" = "audio/webm",
  "font/ttf" = "font/ttf",
  "font/woff" = "font/woff",
  "font/woff2" = "font/woff2",
  "image/gif" = "image/gif",
  "image/jpeg" = "image/jpeg",
  "image/png" = "image/png",
  "image/svg+xml" = "image/svg+xml",
  "image/tiff" = "image/tiff",
  "image/webp" = "image/webp",
  "text/csv" = "text/csv",
  "text/html" = "text/html",
  "text/plain" = "text/plain",
  "text/xml" = "text/xml",
  "video/mpeg" = "video/mpeg",
  "video/ogg" = "video/ogg",
  "video/webm" = "video/webm",
  "video/mp4" = "video/mp4",
  "video/x-msvideo" = "video/x-msvideo",
  "video/quicktime" = "video/quicktime",
}
