'use client'

import { useRouter, useParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, X, Download, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { updateRegistrationStatus, getRegistrationStatus } from '@/lib/event-context'

export default function ParticipantQRCode() {
  const router = useRouter()
  const params = useParams()
  const [showModal, setShowModal] = useState(true)
  const [registrationStatus, setRegistrationStatus] = useState('registered')

  useEffect(() => {
    const status = getRegistrationStatus(params.id as string)
    setRegistrationStatus(status)
  }, [params.id])

  const handleCloseModal = () => {
    setShowModal(false)
    // After closing modal, navigate back - the button will now show "Check In" due to registration status
    router.push(`/participant/event/${params.id}`)
  }

  const handleDownload = () => {
    // Simulate download
    console.log('Downloading QR code...')
    handleCloseModal()
  }

  const participant = {
    name: 'Juan Dela Cruz',
    qrCode: '12345-ABCDE-67890',
    barcode: '1234567890123',
  }

  return (
    <div className="p-6">
      {/* Header */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* QR Code Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="p-6 border border-border bg-card w-full max-w-5xl mx-4">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-2xl font-bold text-foreground">Your Check-In Codes</h1>
              <button
                onClick={handleCloseModal}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Landscape 4-column layout */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* 1: Participant Info */}
              <div className="bg-muted p-4 rounded-lg border border-border space-y-2">
                <h2 className="text-lg font-semibold text-foreground">{participant.name}</h2>
                <p className="text-sm text-muted-foreground">juan.dela.cruz@example.com</p>
                <div className="h-px bg-border" />
                <div className="text-sm">
                  <p className="text-muted-foreground">Department</p>
                  <p className="font-medium text-foreground">College of Engineering</p>
                </div>
                <div className="text-sm">
                  <p className="text-muted-foreground">Program</p>
                  <p className="font-medium text-foreground">BS Computer Engineering</p>
                </div>
              </div>

              {/* 2: QR */}
              <div className="bg-muted p-4 rounded-lg border border-border flex items-center justify-center">
                <div className="aspect-square w-full max-w-56 bg-white rounded flex items-center justify-center">
                  <div className="w-40 h-40 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                    QR Code
                  </div>
                </div>
              </div>

              {/* 3: Barcode */}
              <div className="bg-muted p-4 rounded-lg border border-border flex items-center justify-center">
                <div className="w-full max-w-56 h-24 bg-white rounded flex items-center justify-center text-xs text-gray-500">
                  Barcode
                </div>
              </div>

              {/* 4: Number Equivalent */}
              <div className="bg-muted p-4 rounded-lg border border-border text-center flex flex-col items-center justify-center">
                <p className="text-xs text-muted-foreground mb-2">Code</p>
                <p className="font-mono text-lg font-bold text-foreground break-all">{participant.qrCode}</p>
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleCloseModal}
              >
                Close
              </Button>
              <Button
                className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2"
                onClick={handleDownload}
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* QR Code Display */}
      <Card className="p-8 border border-border bg-card space-y-6">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-foreground mb-2">{participant.name}</h2>
          <p className="text-muted-foreground">Event Check-In</p>
        </div>

        {/* QR Code */}
        <div className="bg-muted p-8 rounded-lg border border-border">
          <div className="aspect-square bg-white rounded flex items-center justify-center">
            <div className="w-48 h-48 bg-gray-200 rounded flex items-center justify-center text-sm text-gray-500">
              QR Code
            </div>
          </div>
        </div>

        {/* Barcode */}
        <div className="bg-muted p-6 rounded-lg border border-border">
          <div className="h-20 bg-white rounded flex items-center justify-center text-sm text-gray-500">
            Barcode
          </div>
        </div>

        {/* Code */}
        <div className="bg-muted p-4 rounded-lg text-center">
          <p className="text-xs text-muted-foreground mb-2">Check-In Code</p>
          <p className="font-mono text-lg font-bold text-foreground">{participant.qrCode}</p>
        </div>

        <Button
          className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2"
          onClick={() => console.log('Download QR code')}
        >
          <Download className="w-4 h-4" />
          Download All Codes
        </Button>
      </Card>
    </div>
  )
}
