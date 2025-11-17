'use client'

import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, Award, Clock, Zap } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getStoredEvents } from '@/lib/event-context'

export default function ParticipantDashboard() {
  const router = useRouter()
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([])

  useEffect(() => {
    const storedEvents = getStoredEvents()
    setUpcomingEvents(storedEvents.slice(0, 3))
  }, [])

  const stats = [
    {
      label: 'Upcoming Events',
      value: upcomingEvents.length.toString(),
      icon: Clock,
      color: 'text-blue-500',
    },
    {
      label: 'Events Joined',
      value: '8',
      icon: Calendar,
      color: 'text-purple-500',
    },
    {
      label: 'Pending Evaluations',
      value: '2',
      icon: Zap,
      color: 'text-orange-500',
    },
    {
      label: 'Certificates Earned',
      value: '6',
      icon: Award,
      color: 'text-green-500',
    },
  ]

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome Back!</h1>
          <p className="text-muted-foreground mt-1">Here's your activity summary</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
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
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            onClick={() => router.push('/participant/events')}
          >
            Browse Events
          </Button>
          <Button
            variant="outline"
            className="border-border text-foreground"
            onClick={() => router.push('/participant/my-events')}
          >
            My Events
          </Button>
          <Button
            variant="outline"
            className="border-border text-foreground"
            onClick={() => router.push('/participant/certificates')}
          >
            My Certificates
          </Button>
        </div>
      </Card>

      {/* Upcoming Events */}
      <Card className="p-6 border border-border bg-card">
        <h2 className="text-xl font-semibold text-foreground mb-4">Upcoming Events</h2>
        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="border border-border rounded-lg overflow-hidden bg-background hover:shadow-sm transition-shadow cursor-pointer" onClick={() => router.push(`/participant/event/${event.id}`)}>
                {event.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={event.coverImage} alt={event.name} className="w-full h-36 object-cover" />
                ) : (
                  <div className="w-full h-36 bg-gradient-to-br from-secondary/20 to-primary/20" />
                )}
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold text-foreground line-clamp-1">{event.name}</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>📅 {event.date}</div>
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
          <p className="text-sm text-muted-foreground">No upcoming events yet</p>
        )}
      </Card>
    </div>
  )
}
