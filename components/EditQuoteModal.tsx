import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface EditQuoteModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (updatedQuote: {
    content: string
    author: string
    category: string
    isPrivate: boolean
    isDraft: boolean
  }) => void
  quote: {
    id: string
    content: string
    author: string
    category: string
    isPrivate: boolean
    isDraft: boolean
  } | null
}

export function EditQuoteModal({ isOpen, onClose, onSave, quote }: EditQuoteModalProps) {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [category, setCategory] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const [isDraft, setIsDraft] = useState(false)

  useEffect(() => {
    if (quote) {
      setContent(quote.content)
      setAuthor(quote.author)
      setCategory(quote.category)
      setIsPrivate(quote.isPrivate)
      setIsDraft(quote.isDraft)
    }
  }, [quote])

  const handleSave = () => {
    onSave({ content, author, category, isPrivate, isDraft })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Quote</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="quote-content">Quote</Label>
            <Textarea
              id="quote-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter the quote"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="quote-author">Author</Label>
            <Input
              id="quote-author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter the author"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="quote-category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="quote-category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inspiration">Inspiration</SelectItem>
                <SelectItem value="motivation">Motivation</SelectItem>
                <SelectItem value="wisdom">Wisdom</SelectItem>
                <SelectItem value="humor">Humor</SelectItem>
                <SelectItem value="love">Love</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="quote-private"
              checked={isPrivate}
              onCheckedChange={setIsPrivate}
            />
            <Label htmlFor="quote-private">Private</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="quote-draft"
              checked={isDraft}
              onCheckedChange={setIsDraft}
            />
            <Label htmlFor="quote-draft">Save as Draft</Label>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
