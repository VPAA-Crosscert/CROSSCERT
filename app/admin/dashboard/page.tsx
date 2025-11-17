'use client'

import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, Users, CheckCircle, Award } from 'lucide-react'
import { getStoredEvents } from '@/lib/event-context'
import { useState, useEffect } from 'react'

export default function AdminDashboard() {
  const router = useRouter()
  const [events, setEvents] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalParticipants: 0,
    attendedToday: 0,
    certificatesIssued: 0,
  })

  useEffect(() => {
    const storedEvents = getStoredEvents()
    setEvents(storedEvents.slice(0, 5))
    
    const totalParticipants = storedEvents.reduce((sum, event) => sum + (event.participants || 0), 0)
    const attendedToday = storedEvents.reduce((sum, event) => sum + (event.attended || 0), 0)
    const certificatesIssued = storedEvents.reduce((sum, event) => sum + (event.certificates || 0), 0)
    
    setStats({
      totalEvents: storedEvents.length,
      totalParticipants,
      attendedToday,
      certificatesIssued,
    })
  }, [])

  const statsArray = [
    {
      label: 'Total Events',
      value: stats.totalEvents.toString(),
      icon: Calendar,
      color: 'text-blue-500',
    },
    {
      label: 'Total Participants',
      value: stats.totalParticipants.toString(),
      icon: Users,
      color: 'text-purple-500',
    },
    {
      label: 'Attended Today',
      value: stats.attendedToday.toString(),
      icon: CheckCircle,
      color: 'text-green-500',
    },
    {
      label: 'Certificates Issued',
      value: stats.certificatesIssued.toString(),
      icon: Award,
      color: 'text-red-500',
    },
  ]

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome to your admin panel</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsArray.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="p-6 border border-border bg-card">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                </div>
                <Icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <Card className="p-6 border border-border bg-card">
        <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => router.push('/admin/events/create')}
          >
            Create New Event
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push('/admin/events')}
          >
            Manage Events
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push('/admin/participants')}
          >
            View Participants
          </Button>
        </div>
      </Card>

      {/* Recent Events */}
      <Card className="p-6 border border-border bg-card">
        <h2 className="text-xl font-semibold text-foreground mb-4">Recent Events</h2>
        {events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <div key={event.id} className="border border-border rounded-lg overflow-hidden bg-background hover:shadow-sm transition-shadow cursor-pointer" onClick={() => router.push(`/admin/events/${event.id}`)}>
                {event.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={event.coverImage} alt={event.name} className="w-full h-36 object-cover" />
                ) : (
                  <div className="w-full h-36 bg-gradient-to-br from-secondary/20 to-primary/20" />
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
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No events created yet</p>
        )}
      </Card>
    </div>
  )
}
