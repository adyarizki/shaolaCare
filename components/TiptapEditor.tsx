'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading,
  Undo2,
  Redo2,
  Link as LinkIcon,
  Palette,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useState } from 'react'

export default function TiptapEditor() {
  const [linkUrl, setLinkUrl] = useState('')

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      TextStyle,
      Color,
      Highlight,
    ],
    content: '<p>Tulis konten blog di sini...</p>',
  })

  if (!editor) return null

  const isActive = (format: string, options = {}) =>
    editor.isActive(format, options)

  const handleLink = () => {
    const url = window.prompt('Masukkan URL:', linkUrl || 'https://')
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run()
      setLinkUrl('')
    }
  }

  return (
    <Card className="max-w-3xl mx-auto mt-8">
      <CardContent className="space-y-4">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={isActive('bold') ? 'secondary' : 'outline'}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold className="w-4 h-4" />
          </Button>
          <Button
            variant={isActive('italic') ? 'secondary' : 'outline'}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic className="w-4 h-4" />
          </Button>
          <Button
            variant={isActive('underline') ? 'secondary' : 'outline'}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <UnderlineIcon className="w-4 h-4" />
          </Button>
          <Button
            variant={isActive('heading', { level: 1 }) ? 'secondary' : 'outline'}
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          >
            H1
          </Button>
          <Button
            variant={isActive('heading', { level: 2 }) ? 'secondary' : 'outline'}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          >
            H2
          </Button>
          <Button
            variant={isActive('heading', { level: 3 }) ? 'secondary' : 'outline'}
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          >
            H3
          </Button>
          <Button
            variant={isActive('bulletList') ? 'secondary' : 'outline'}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            variant={isActive('orderedList') ? 'secondary' : 'outline'}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered className="w-4 h-4" />
          </Button>
          <Button variant="outline" onClick={handleLink}>
            <LinkIcon className="w-4 h-4" />
          </Button>
          <Button variant="outline" onClick={() => editor.chain().focus().undo().run()}>
            <Undo2 className="w-4 h-4" />
          </Button>
          <Button variant="outline" onClick={() => editor.chain().focus().redo().run()}>
            <Redo2 className="w-4 h-4" />
          </Button>
          <input
            type="color"
            title="Text Color"
            onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
            className="h-8 w-8 cursor-pointer rounded border"
          />
        </div>

        {/* Editor */}
        <EditorContent
          editor={editor}
          className="min-h-[200px] border border-border rounded-md p-4 focus:outline-none prose max-w-none"
        />
      </CardContent>
    </Card>
  )
}
