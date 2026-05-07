import 'package:flutter/material.dart';

/// AccordionCard — accessible, full-header-clickable accordion.
///
/// The entire header row (stripe + [header] + chevron) is a single [InkWell],
/// so there are no nested tap targets and no duplicate gesture events.
/// A [Semantics] wrapper exposes toggle state to screen readers.
///
/// Parameters:
///   open           controlled open state
///   onToggle       called when the header is tapped
///   stripeColor    left accent stripe colour
///   header         content between the stripe and the chevron
///   footer         always-visible widget rendered below the header
///   child          animated collapsible content
///   semanticLabel  label announced by screen readers
class AccordionCard extends StatelessWidget {
  const AccordionCard({
    super.key,
    required this.open,
    required this.onToggle,
    required this.stripeColor,
    required this.header,
    this.footer,
    this.child,
    this.semanticLabel,
  });

  final bool         open;
  final VoidCallback onToggle;
  final Color        stripeColor;
  final Widget       header;
  final Widget?      footer;
  final Widget?      child;
  final String?      semanticLabel;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(
          color: open ? const Color(0xFFC7C3F5) : const Color(0xFFE8E8F5),
        ),
        boxShadow: open
            ? [
                BoxShadow(
                  color: const Color(0xFF4F46E5).withValues(alpha: 0.08),
                  blurRadius: 24,
                  offset: const Offset(0, 4),
                ),
              ]
            : const [],
      ),
      clipBehavior: Clip.hardEdge,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Full-width clickable header — single tap target, no nested gestures
          Semantics(
            button: true,
            label: semanticLabel,
            toggled: open,
            child: Material(
              color: Colors.transparent,
              child: InkWell(
                onTap: onToggle,
                child: IntrinsicHeight(
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Container(width: 5, color: stripeColor),
                      Expanded(
                        child: Padding(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 14,
                            vertical: 14,
                          ),
                          child: Row(
                            children: [
                              Expanded(child: header),
                              AnimatedRotation(
                                turns: open ? 0.5 : 0,
                                duration: const Duration(milliseconds: 200),
                                child: Icon(
                                  Icons.keyboard_arrow_down_rounded,
                                  color: open
                                      ? const Color(0xFF4F46E5)
                                      : const Color(0xFFD1D5DB),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),

          // Always-visible footer slot (e.g. progress bar)
          if (footer != null) footer!,

          // Animated collapsible region
          AnimatedSize(
            duration: const Duration(milliseconds: 200),
            curve: Curves.easeInOut,
            child: open ? (child ?? const SizedBox.shrink()) : const SizedBox.shrink(),
          ),
        ],
      ),
    );
  }
}
