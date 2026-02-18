
export enum Severity {
  CRITICAL = 'CRITICAL',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
  INFO = 'INFO'
}

export interface NetworkAlert {
  id: string;
  timestamp: string;
  sourceIp: string;
  destIp: string;
  protocol: string;
  port: number;
  severity: Severity;
  category: string;
  description: string;
  rawLogs?: string;
  mitreTechnique?: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'FALSE_POSITIVE';
  analysis?: string;
}

export interface TrafficMetric {
  time: string;
  ingress: number;
  egress: number;
  threats: number;
}

export interface IncidentPlaybook {
  id: string;
  title: string;
  steps: string[];
}
