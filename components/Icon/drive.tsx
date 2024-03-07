import { SerializedStyles } from "@emotion/react"
import { GCS_OBJECT_TYPE } from "@illa-public/public-types"
import {
  ILLA_DRIVE_OBJECT_TYPE,
  getFileTypeByContentType,
} from "@illa-public/utils"
import { ReactNode } from "react"
import { AnonymousIcon, FolderIcon, ZipIcon } from "."
import FileDefaultIcon from "./publicIcon/fileDefault.svg?react"
import FileExcelIcon from "./publicIcon/fileExcel.svg?react"
import FileMusicIcon from "./publicIcon/fileMusic.svg?react"
import FilePDFIcon from "./publicIcon/filePDF.svg?react"
import FilePPTIcon from "./publicIcon/filePPT.svg?react"
import FilePictureIcon from "./publicIcon/filePicture.svg?react"
import FileVideoIcon from "./publicIcon/fileVideo.svg?react"
import FileWordIcon from "./publicIcon/fileWord.svg?react"

export const getFileIconByILLAFileType = (
  type: ILLA_DRIVE_OBJECT_TYPE,
  iconStyle?: SerializedStyles,
) => {
  switch (type) {
    case ILLA_DRIVE_OBJECT_TYPE.IMAGE:
      return <FilePictureIcon css={iconStyle} />
    case ILLA_DRIVE_OBJECT_TYPE.VIDEO:
      return <FileVideoIcon css={iconStyle} />
    case ILLA_DRIVE_OBJECT_TYPE.AUDIO:
      return <FileMusicIcon css={iconStyle} />
    case ILLA_DRIVE_OBJECT_TYPE.PDF:
      return <FilePDFIcon css={iconStyle} />
    case ILLA_DRIVE_OBJECT_TYPE.WORD:
      return <FileWordIcon css={iconStyle} />
    case ILLA_DRIVE_OBJECT_TYPE.EXCEL:
      return <FileExcelIcon css={iconStyle} />
    case ILLA_DRIVE_OBJECT_TYPE.PPT:
      return <FilePPTIcon css={iconStyle} />
    case ILLA_DRIVE_OBJECT_TYPE.FOLDER:
      return <FolderIcon css={iconStyle} />
    case ILLA_DRIVE_OBJECT_TYPE.ZIP:
      return <ZipIcon css={iconStyle} />
    case ILLA_DRIVE_OBJECT_TYPE.ANONYMOUS_FOLDER:
      return <AnonymousIcon css={iconStyle} />
    default:
      return <FileDefaultIcon css={iconStyle} />
  }
}

export const getFileIconByContentType = (
  type: GCS_OBJECT_TYPE,
  contentType?: string,
  iconStyle?: SerializedStyles,
): ReactNode => {
  const illaFileType = getFileTypeByContentType(type, contentType)
  return getFileIconByILLAFileType(illaFileType, iconStyle)
}
