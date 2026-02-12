import React from 'react'
import { Input } from 'antd'

const { TextArea } = Input

interface RichTextEditorProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  height?: number
}

/**
 * 富文本编辑器包装组件
 *
 * 提示：正式项目中建议安装 react-quill 或 @tinymce/tinymce-react 并在此处集成。
 * 当前版本作为一个功能占位和标准化的 API 容器。
 */
const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = '请输入内容...',
  height = 300,
}) => {
  return (
    <div className="rich-text-editor-wrapper">
      <TextArea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        style={{ height, minHeight: height }}
      />
      <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
        💡 此处为富文本编辑器预留位置，可通过集成 Quill 或 TinyMCE 进行扩展。
      </div>
    </div>
  )
}

export default RichTextEditor
