import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Mail, 
  Calendar, 
  Phone, 
  MessageSquare, 
  User, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  createdAt: string;
}

interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string | null;
  service: string;
  preferredDate: string | null;
  message: string | null;
  status: string;
  createdAt: string;
}

export default function AdminPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch contact inquiries
  const { data: inquiries = [], isLoading: loadingInquiries } = useQuery<ContactInquiry[]>({
    queryKey: ["/api/contact"],
  });

  // Fetch appointments
  const { data: appointments = [], isLoading: loadingAppointments } = useQuery<Appointment[]>({
    queryKey: ["/api/appointments"],
  });

  // Update appointment status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await apiRequest("PATCH", `/api/appointments/${id}/status`, { status });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/appointments"] });
      toast({
        title: "Status Updated",
        description: "Appointment status has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update status.",
        variant: "destructive",
      });
    },
  });

  const handleStatusUpdate = (id: string, status: string) => {
    updateStatusMutation.mutate({ id, status });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800";
      case "completed": return "bg-blue-100 text-blue-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-yellow-100 text-yellow-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed": return <CheckCircle className="h-4 w-4" />;
      case "completed": return <CheckCircle className="h-4 w-4" />;
      case "cancelled": return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-muted/20 py-8">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage contact inquiries and appointments
          </p>
        </div>

        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="appointments" data-testid="tab-appointments">
              Appointments ({appointments.length})
            </TabsTrigger>
            <TabsTrigger value="inquiries" data-testid="tab-inquiries">
              Contact Inquiries ({inquiries.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="space-y-4">
            {loadingAppointments ? (
              <div className="text-center py-8">Loading appointments...</div>
            ) : appointments.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No appointments found</p>
                </CardContent>
              </Card>
            ) : (
              appointments.map((appointment) => (
                <Card key={appointment.id} data-testid={`card-appointment-${appointment.id}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <User className="h-5 w-5 text-primary" />
                        <div>
                          <CardTitle className="text-lg">{appointment.clientName}</CardTitle>
                          <CardDescription>{appointment.service}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(appointment.status)}>
                          {getStatusIcon(appointment.status)}
                          <span className="ml-1 capitalize">{appointment.status}</span>
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{appointment.clientEmail}</span>
                      </div>
                      {appointment.clientPhone && (
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{appointment.clientPhone}</span>
                        </div>
                      )}
                      {appointment.preferredDate && (
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{appointment.preferredDate}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(appointment.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    {appointment.message && (
                      <div className="border-t pt-3">
                        <div className="flex items-start space-x-2">
                          <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <p className="text-sm text-muted-foreground">{appointment.message}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex space-x-2 pt-2">
                      {appointment.status === "pending" && (
                        <Button
                          size="sm"
                          onClick={() => handleStatusUpdate(appointment.id, "confirmed")}
                          disabled={updateStatusMutation.isPending}
                          data-testid={`button-confirm-${appointment.id}`}
                        >
                          Confirm
                        </Button>
                      )}
                      {appointment.status === "confirmed" && (
                        <Button
                          size="sm"
                          onClick={() => handleStatusUpdate(appointment.id, "completed")}
                          disabled={updateStatusMutation.isPending}
                          data-testid={`button-complete-${appointment.id}`}
                        >
                          Mark Complete
                        </Button>
                      )}
                      {appointment.status !== "cancelled" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusUpdate(appointment.id, "cancelled")}
                          disabled={updateStatusMutation.isPending}
                          data-testid={`button-cancel-${appointment.id}`}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="inquiries" className="space-y-4">
            {loadingInquiries ? (
              <div className="text-center py-8">Loading inquiries...</div>
            ) : inquiries.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No contact inquiries found</p>
                </CardContent>
              </Card>
            ) : (
              inquiries.map((inquiry) => (
                <Card key={inquiry.id} data-testid={`card-inquiry-${inquiry.id}`}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <CardTitle className="text-lg">{inquiry.name}</CardTitle>
                        <CardDescription>
                          {inquiry.service ? `Interested in: ${inquiry.service}` : "General inquiry"}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{inquiry.email}</span>
                      </div>
                      {inquiry.phone && (
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{inquiry.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(inquiry.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="border-t pt-3">
                      <div className="flex items-start space-x-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <p className="text-sm text-muted-foreground">{inquiry.message}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}