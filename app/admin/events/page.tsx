'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Plus, Edit, Trash2, Eye, Calendar } from 'lucide-react'

type AdminEvent = {
  id: number | string
  name: string
  date: string
  participants: number
  attended: number
  evaluated: number
  certificates: number
  coverImage?: string
  startTime?: string
  endTime?: string
  venue?: string
}

export default function AdminEvents() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | number | null>(null)
  const [events, setEvents] = useState<AdminEvent[]>([
    {
      id: 1,
      name: 'Python Workshop',
      date: 'Dec 15, 2024',
      participants: 32,
      attended: 28,
      evaluated: 25,
      certificates: 25,
      coverImage: undefined as unknown as string,
      startTime: '',
      endTime: '',
      venue: '',
    },
    {
      id: 2,
      name: 'Leadership Seminar',
      date: 'Dec 18, 2024',
      participants: 50,
      attended: 48,
      evaluated: 45,
      certificates: 45,
      coverImage: undefined as unknown as string,
      startTime: '',
      endTime: '',
      venue: '',
    },
  ])

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('events') || '[]')
    if (savedEvents.length > 0) {
      // Format saved events to match table structure
      const formattedEvents: AdminEvent[] = savedEvents.map((event: any) => ({
        id: event.id,
        name: event.name,
        date: event.date,
        participants: event.participants || 0,
        attended: event.attended || 0,
        evaluated: event.evaluated || 0,
        certificates: event.certificates || 0,
        coverImage: event.coverImage,
        startTime: event.startTime,
        endTime: event.endTime,
        venue: event.venue,
      }))
      setEvents([...events, ...formattedEvents])
    }
  }, [])

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = (id: string | number) => {
    setEvents(events.filter(e => e.id !== id))
    const savedEvents = JSON.parse(localStorage.getItem('events') || '[]')
    const updatedEvents = savedEvents.filter((e: any) => e.id !== id)
    localStorage.setItem('events', JSON.stringify(updatedEvents))
    setShowDeleteConfirm(null)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Events</h1>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
          onClick={() => router.push('/admin/events/create')}
        >
          <Plus className="w-4 h-4" />
          Create Event
        </Button>
      </div>

      {/* Search */}
      <Input
        placeholder="Search events..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-md bg-background border-border"
      />

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="border border-border bg-card overflow-hidden">
            {event.coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={event.coverImage} alt={event.name} className="w-full h-40 object-cover" />
            ) : (
              <div className="w-full h-40 bg-gradient-to-br from-secondary/20 to-primary/20" />
            )}
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold text-foreground line-clamp-1">{event.name}</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> <span>{event.date}</span></div>
                {event.startTime && event.endTime && (
                  <div>⏰ {event.startTime} - {event.endTime}</div>
                )}
                {event.venue && (
                  <div>📍 {event.venue}</div>
                )}
              </div>
              <div className="flex justify-end gap-1 pt-2">
                <Button variant="ghost" size="sm" title="View" onClick={() => router.push(`/admin/events/${event.id}`)}>
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" title="Edit" onClick={() => router.push(`/admin/events/${event.id}/edit`)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-destructive" title="Delete" onClick={() => setShowDeleteConfirm(event.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="p-6 border border-border bg-card max-w-sm">
            <h2 className="text-lg font-bold text-foreground mb-2">Delete Event</h2>
            <p className="text-muted-foreground mb-6">Are you sure you want to delete this event? This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(null)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(showDeleteConfirm)}
              >
                Delete
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
