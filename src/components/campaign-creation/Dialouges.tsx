// "use client"

// import { useState } from "react"
// import { CardComponent } from "./DynamicCard"
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Button } from "@/components/ui/button"
// import { Calendar } from "@/components/ui/calendar"
// import { format } from "date-fns"
// import { CalendarIcon, CheckCircle, UploadCloud } from "lucide-react"
// import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

// export default function CampaignPage() {
//   const [open, setOpen] = useState(false)
//   const [step, setStep] = useState(1)
//   const [showAlert, setShowAlert] = useState(false)
//   const [formData, setFormData] = useState({
//     title: "",
//     company: "",
//     role: "",
//     description: "",
//     start: null,
//     end: null,
//   })
//   const [errors, setErrors] = useState<any>({})

//   const validateStep = () => {
//     const newErrors: any = {}
//     if (step === 1) {
//       if (!formData.title) newErrors.title = "Required"
//       if (!formData.company) newErrors.company = "Required"
//       if (!formData.start || !formData.end) newErrors.dates = "Required"
//     } else if (step === 2) {
//       if (!formData.role) newErrors.role = "Required"
//       if (!formData.description) newErrors.description = "Required"
//     }
//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleNext = () => {
//     if (validateStep()) setStep(step + 1)
//   }

//   const handleBack = () => setShowAlert(true)
//   const confirmBack = () => {
//     setShowAlert(false)
//     setOpen(false)
//     setStep(1)
//     setErrors({})
//   }

//   return (
//     <div className="p-6">
//       <CardComponent
//         className="lg:flex hidden"
//         variant="create"
//         onClick={() => setOpen(true)}
//       />

//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent className="max-w-md">
//           <DialogHeader>
//             <DialogTitle>Create Campaign</DialogTitle>
//             <p className="text-sm text-muted-foreground">
//               {step === 1 ? "Campaign Specifics" : step === 2 ? "Job Specifics" : ""}
//             </p>
//           </DialogHeader>

//           {step === 1 && (
//             <div className="space-y-4">
//               <FormItem>
//                 <FormLabel>Title</FormLabel>
//                 <FormControl>
//                   <Input
//                     value={formData.title}
//                     onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                     placeholder="Title of your Campaign"
//                   />
//                 </FormControl>
//                 {errors.title && <FormMessage>{errors.title}</FormMessage>}
//               </FormItem>

//               <FormItem>
//                 <FormLabel>Campaign Duration</FormLabel>
//                 <div className="flex gap-2">
//                   <Calendar
//                     mode="single"
//                     selected={formData.start}
//                     onSelect={(date) => setFormData({ ...formData, start: date })}
//                   />
//                   <Calendar
//                     mode="single"
//                     selected={formData.end}
//                     onSelect={(date) => setFormData({ ...formData, end: date })}
//                   />
//                 </div>
//                 {errors.dates && <FormMessage>{errors.dates}</FormMessage>}
//               </FormItem>

//               <FormItem>
//                 <FormLabel>Company Name</FormLabel>
//                 <FormControl>
//                   <Input
//                     value={formData.company}
//                     onChange={(e) => setFormData({ ...formData, company: e.target.value })}
//                     placeholder="Name of your Company"
//                   />
//                 </FormControl>
//                 {errors.company && <FormMessage>{errors.company}</FormMessage>}
//               </FormItem>

//               <div className="flex items-center gap-3">
//                 <Avatar><AvatarFallback>CN</AvatarFallback></Avatar>
//                 <Button size="sm"><UploadCloud className="w-4 h-4 mr-1" /> Upload photo</Button>
//               </div>

//               <div className="flex justify-between pt-4">
//                 <Button variant="outline" onClick={handleBack}>Cancel</Button>
//                 <Button onClick={handleNext}>Next</Button>
//               </div>
//             </div>
//           )}

//           {step === 2 && (
//             <div className="space-y-4">
//               <FormItem>
//                 <FormLabel>Role Required</FormLabel>
//                 <FormControl>
//                   <Input
//                     value={formData.role}
//                     onChange={(e) => setFormData({ ...formData, role: e.target.value })}
//                     placeholder="Name of the Role"
//                   />
//                 </FormControl>
//                 {errors.role && <FormMessage>{errors.role}</FormMessage>}
//               </FormItem>

//               <FormItem>
//                 <FormLabel>Job Description</FormLabel>
//                 <FormControl>
//                   <Textarea
//                     value={formData.description}
//                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                     placeholder="Type your message here"
//                   />
//                 </FormControl>
//                 {errors.description && <FormMessage>{errors.description}</FormMessage>}
//               </FormItem>

//               <div className="flex justify-between pt-4">
//                 <Button variant="outline" onClick={handleBack}>Back</Button>
//                 <Button
//                   onClick={() => {
//                     if (validateStep()) setStep(3)
//                   }}
//                 >
//                   Create
//                 </Button>
//               </div>
//             </div>
//           )}

//           {step === 3 && (
//             <div className="py-12 text-center space-y-4">
//               <CheckCircle className="mx-auto text-green-500 w-10 h-10" />
//               <p className="text-xl font-semibold">New Campaign Created</p>
//               <div className="flex justify-center">
//                 <div className="flex items-center gap-4">
//                   <div className="w-4 h-4 bg-green-500 rounded-full" />
//                   <div className="w-4 h-4 bg-green-500 rounded-full" />
//                 </div>
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* Confirmation Alert */}
//       <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Are you sure you want to go back?</AlertDialogTitle>
//             <AlertDialogDescription>
//               This action cannot be undone. It will cancel this campaign creation process.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <Button onClick={confirmBack} className="bg-green-100 text-green-800">Continue</Button>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   )
// }
