
import { Severity, NetworkAlert, IncidentPlaybook } from './types';

export const MOCK_ALERTS: NetworkAlert[] = [
  {
    id: 'AL-90210',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    sourceIp: '192.168.1.142',
    destIp: '104.26.11.233',
    protocol: 'HTTPS',
    port: 443,
    severity: Severity.CRITICAL,
    category: 'Exfiltration',
    description: 'Suspicious outbound data volume detected (2.4GB over 10min)',
    mitreTechnique: 'T1048.003 - Exfiltration Over Unencrypted/Obfuscated Non-C2 Protocol',
    status: 'OPEN',
    rawLogs: '{"event_type": "flow", "bytes_toserver": 2400500120, "flow_duration": 600, "app_proto": "tls"}'
  },
  {
    id: 'AL-90211',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    sourceIp: '10.0.0.15',
    destIp: '10.0.0.254',
    protocol: 'SMB',
    port: 445,
    severity: Severity.HIGH,
    category: 'Lateral Movement',
    description: 'Multiple failed SMB authentication attempts followed by successful login',
    mitreTechnique: 'T1210 - Exploitation of Remote Services',
    status: 'IN_PROGRESS',
    rawLogs: '{"event_type": "smb", "smb_command": "login", "status": "FAIL", "count": 45}'
  },
  {
    id: 'AL-90212',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    sourceIp: '172.16.0.4',
    destIp: '8.8.8.8',
    protocol: 'DNS',
    port: 53,
    severity: Severity.MEDIUM,
    category: 'C2 Communication',
    description: 'Unusual DNS query patterns (DGA suspected)',
    mitreTechnique: 'T1568.002 - Dynamic Resolution: Domain Generation Algorithms',
    status: 'OPEN',
    rawLogs: '{"event_type": "dns", "query": "asdf92jk1lz.top", "rrtype": "A"}'
  }
];

export const PLAYBOOKS: IncidentPlaybook[] = [
  {
    id: 'PB-EXFIL',
    title: 'Data Exfiltration Response',
    steps: [
      'Isolate affected host from external network',
      'Dump volatile memory for forensic analysis',
      'Identify source of data leakage (process/user)',
      'Review cloud egress logs for correlation',
      'Block destination IP at perimeter firewall'
    ]
  },
  {
    id: 'PB-BRUTE',
    title: 'Brute Force / Lateral Movement',
    steps: [
      'Disable compromised user account',
      'Enforce password reset across domain',
      'Audit access logs for targeted lateral targets',
      'Reset kerberos ticketing (TGT) if Golden Ticket suspected'
    ]
  }
];
