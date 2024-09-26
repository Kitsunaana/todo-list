import { todosStore, Types } from "@entities/todo";
import { Divider, Flex, Switch, Typography } from "antd";
import { observer } from "mobx-react-lite";
import styled from "styled-components";

const { Text } = Typography;

export const PreviewSettingsDivider = styled(Divider)`
  margin: 4px 0px !important;
  border-color: #575555 !important;

  span {
    font-weight: 400;
  }
`

const labels: Record<Types.Key, string> = {
  isShowHatch: "Штриховку",
  isShowStatus: "Статус"
}

export const TodoPreviewSettings = observer(() => {
  return (
    <div style={{ minWidth: 250 }}>
      <PreviewSettingsDivider>Скрыть из заголовка</PreviewSettingsDivider>
      <Flex vertical gap={4}>
        {Object.entries(todosStore.settings).map(([key, value]) => (
          <Flex gap={8} align="center" key={key}>
            <Switch
              value={value}
              onChange={(checked) => (
                todosStore.onChangePreviewSettings(
                  key as Types.Key,
                  checked as Types.Value
                )
              )}
            />
            <Text style={{ fontSize: 16 }}>{labels[key as Types.Key]}</Text>
          </Flex>
        ))}
      </Flex>
    </div>
  )
})
