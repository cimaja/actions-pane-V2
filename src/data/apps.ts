import type { LucideIcon } from 'lucide-react';
import { 
  FileText, Database, Mail, Globe, Cloud, MessageSquare, Calendar, Users, 
  CheckSquare, Trello, Github, BarChart, Twitter, Folder, FileCode, 
  Slack, CreditCard, ShoppingCart, FileSpreadsheet, Video, Clipboard, 
  BookOpen, Map, Link, Send, Instagram, Linkedin, Youtube, Rss, 
  Server, Lock, PenTool, Headphones, Briefcase, BarChart2, FileQuestion,
  Smartphone, Clock, DollarSign, Package, Truck, HelpCircle, Zap
} from 'lucide-react';

export interface App {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  category: string;
}