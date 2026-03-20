"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { patientsData } from "@/lib/constants";
import { getStatusColor } from "@/lib/utils";
import {
  Calendar,
  Clock,
  LayoutGrid,
  List,
  Mail,
  MapPin,
  Phone,
  Search,
} from "lucide-react";
import { Activity, useState } from "react";

export default function PatientsView() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = patientsData.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.department.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <div className="container">
      {/* Search and View Toggle */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
        <InputGroup className="max-w-md">
          <InputGroupInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            {filteredPatients.length} results
          </InputGroupAddon>
        </InputGroup>

        {/* View Toggle Buttons */}
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
            className={
              viewMode === "grid" ? "bg-primary text-primary-foreground" : ""
            }
          >
            <LayoutGrid className="h-5 w-5" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
            className={
              viewMode === "list" ? "bg-primary text-primary-foreground" : ""
            }
          >
            <List className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Activity mode={viewMode === "grid" ? "visible" : "hidden"}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <Card
              key={patient.id}
              className="bg-card border-border hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <CardTitle className="text-lg text-foreground">
                      {patient.name}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {patient.department}
                    </CardDescription>
                  </div>
                  <Badge className={`${getStatusColor(patient.status)} border`}>
                    {patient.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-foreground">{patient.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-foreground">{patient.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-foreground text-xs">
                      {patient.address}
                    </span>
                  </div>
                </div>

                {/* Demographics */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Age</p>
                    <p className="font-semibold text-foreground">
                      {patient.age} years
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Blood Type</p>
                    <p className="font-semibold text-foreground">
                      {patient.bloodType}
                    </p>
                  </div>
                </div>

                {/* Medical Info */}
                <div className="border-t border-border pt-3">
                  {patient.conditions.length > 0 && (
                    <div className="mb-2">
                      <p className="text-xs text-muted-foreground mb-1">
                        Conditions
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {patient.conditions.map((condition) => (
                          <Badge key={condition} className="text-xs">
                            {condition}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Appointments */}
                <div className="bg-stone-100 rounded-md p-2 space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <Clock className="h-3 w-3 text-primary" />
                    <span className="text-muted-foreground">
                      Last visit: {patient.lastVisit}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Calendar className="h-3 w-3 text-primary" />
                    <span className="text-muted-foreground">
                      Next visit: {patient.nextAppointment}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Activity>

      <Activity mode={viewMode === "list" ? "visible" : "hidden"}>
        <div className="space-y-3">
          {filteredPatients.map((patient) => (
            <Card
              key={patient.id}
              className="bg-card border-border hover:shadow-md transition-shadow"
            >
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Name and Status */}
                  <div className="md:col-span-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="font-semibold text-primary">
                          {patient.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {patient.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {patient.id}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="md:col-span-2 text-sm">
                    <p className="text-muted-foreground text-xs">Contact</p>
                    <p className="text-foreground truncate">{patient.email}</p>
                  </div>

                  {/* Department and Age */}
                  <div className="md:col-span-2 text-sm">
                    <p className="text-muted-foreground text-xs">Department</p>
                    <p className="text-foreground">{patient.department}</p>
                  </div>

                  {/* Appointments */}
                  <div className="md:col-span-2 text-sm">
                    <p className="text-muted-foreground text-xs">
                      Next Appointment
                    </p>
                    <p className="text-foreground">{patient.nextAppointment}</p>
                  </div>

                  {/* Conditions */}
                  <div className="md:col-span-2 text-sm">
                    <p className="text-muted-foreground text-xs">Conditions</p>
                    {patient.conditions.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {patient.conditions.slice(0, 2).map((condition) => (
                          <Badge key={condition} className="text-xs">
                            {condition}
                          </Badge>
                        ))}
                        {patient.conditions.length > 2 && (
                          <Badge className="text-xs">
                            +{patient.conditions.length - 2}
                          </Badge>
                        )}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-xs">None</p>
                    )}
                  </div>

                  {/* Status Badge */}
                  <div className="md:col-span-1 flex justify-end">
                    <Badge
                      className={`${getStatusColor(patient.status)} border`}
                    >
                      {patient.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Activity>
    </div>
  );
}
