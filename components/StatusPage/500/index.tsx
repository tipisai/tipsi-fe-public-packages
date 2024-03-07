import { Button } from "antd"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { ErrorPage } from "../Layout"
import { buttonStyle, iconStyle } from "../Layout/style"
import Result500Icon from "../assets/result500.svg?react"

export const Page500: FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <ErrorPage
      title="500"
      des={t("status.500.des")}
      img={<Result500Icon css={iconStyle} />}
    >
      <div css={buttonStyle}>
        <Button type="primary" onClick={() => navigate("/")}>
          {t("status.back")}
        </Button>
      </div>
    </ErrorPage>
  )
}

export default Page500
